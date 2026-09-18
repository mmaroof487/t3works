import { randomUUID } from 'crypto';

function datePart(): string {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

export function generateCandidateId(): string {
  const shortId = randomUUID().split('-')[0].toUpperCase();
  return `T3C-${datePart()}-${shortId}`;
}

export function generateRequirementId(): string {
  const shortId = randomUUID().split('-')[0].toUpperCase();
  return `T3E-${datePart()}-${shortId}`;
}

// Next upcoming Saturday, formatted for the candidate email — a fixed, predictable cadence
// until a real Phase 0 scheduling system exists.
export function nextPhase0Window(): string {
  const now = new Date();
  const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilSaturday);
  return target.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const TALENT_ARCHITECTS = ['Priya Nair', 'Marcus Lee', 'Sofia Alvarez', 'Daniel Kim'] as const;

export function assignTalentArchitect(): string {
  const index = Math.floor(Math.random() * TALENT_ARCHITECTS.length);
  return TALENT_ARCHITECTS[index];
}
