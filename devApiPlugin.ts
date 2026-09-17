import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';

type ApiHandler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

function findApiFile(apiDir: string, route: string): string | null {
  const candidate = path.join(apiDir, `${route}.ts`);
  return fs.existsSync(candidate) ? candidate : null;
}

/**
 * Runs Vercel-style `/api/*.ts` handlers inside the Vite dev server so `npm run dev`
 * exercises the real backend locally, without needing the Vercel CLI or an account.
 * Production deploys still go through Vercel's own `/api` runtime — this plugin only
 * applies to `vite dev`.
 */
export function devApiPlugin(): Plugin {
  const apiDir = path.resolve(import.meta.dirname, 'api');

  return {
    name: 'dev-api-plugin',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          next();
          return;
        }

        const [routePath] = req.url.slice('/api/'.length).split('?');
        const filePath = findApiFile(apiDir, routePath);

        if (!filePath) {
          next();
          return;
        }

        try {
          const mod = await server.ssrLoadModule(filePath);
          const handler = mod.default as ApiHandler | undefined;

          if (typeof handler !== 'function') {
            next();
            return;
          }

          const vercelRes = res as ServerResponse & {
            status: (code: number) => typeof vercelRes;
            json: (body: unknown) => typeof vercelRes;
            send: (body: unknown) => typeof vercelRes;
          };
          vercelRes.status = (code: number) => {
            res.statusCode = code;
            return vercelRes;
          };
          vercelRes.json = (body: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
            return vercelRes;
          };
          vercelRes.send = (body: unknown) => {
            res.end(body);
            return vercelRes;
          };

          await handler(req, vercelRes);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          console.error(`[dev-api] Error handling ${req.url}:`, error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        }
      });
    },
  };
}
