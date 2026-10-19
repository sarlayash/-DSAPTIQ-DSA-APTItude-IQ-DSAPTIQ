import { DailyLevel, LearnerProfile } from '../types';

export interface CertificateData {
  candidateName: string;
  levelNumber: number;
  dayNumber: number;
  levelTitle: string;
  difficulty: string;
  badgeName: string;
  xpReward: number;
  totalXP: number;
  accessCode: string;
  issuedDate: string;
  certificateId: string;
  certificateTitle: string;
}

/**
 * Renders a formal Fortune 500 Placement Readiness Certificate to an HTML5 canvas.
 * Fixed dimensions: 1600 x 1130 px (Standard high-res landscape ratio).
 * Strict mathematical layout ensures zero overlapping or border clipping issues.
 */
export function renderCertificateToCanvas(
  data: CertificateData,
  canvas: HTMLCanvasElement
): void {
  const width = 1600;
  const height = 1130;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Pristine Off-White Executive Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Soft subtle warm paper gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.5, '#F8FAFC');
  bgGrad.addColorStop(1, '#F1F5F9');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. High-Precision Double Border System (Safe margins with zero clipping)
  // Outer Border (Navy)
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Middle Border (Gold Accent)
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Inner Subtle Hairline Border
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // Corner Flourishes (Drawn strictly within inner margin)
  const drawCornerFlourish = (x: number, y: number, dirX: number, dirY: number) => {
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + dirX * 10, y + dirY * 35);
    ctx.lineTo(x + dirX * 10, y + dirY * 10);
    ctx.lineTo(x + dirX * 35, y + dirY * 10);
    ctx.stroke();

    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(x + dirX * 16, y + dirY * 16, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  drawCornerFlourish(68, 68, 1, 1);
  drawCornerFlourish(width - 68, 68, -1, 1);
  drawCornerFlourish(68, height - 68, 1, -1);
  drawCornerFlourish(width - 68, height - 68, -1, -1);

  // 3. Institution Header & Mission Crest
  ctx.textAlign = 'center';

  // Mission Brand Tag
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.letterSpacing = '3px';
  ctx.fillText('SARLA YASH RECOGNITION BOARD · KAPIL NARULA LEADERSHIP', width / 2, 115);

  // Standard Header
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#1E3A8A';
  ctx.letterSpacing = '2px';
  ctx.fillText('DRAPTI / DSAPTIQ PLACEMENT READINESS & TRAINING ACCREDITATION', width / 2, 142);

  // Decorative Horizontal Ribbon
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 280, 165);
  ctx.lineTo(width / 2 + 280, 165);
  ctx.stroke();

  // Central Crimson Diamond
  ctx.fillStyle = '#DC2626';
  ctx.beginPath();
  ctx.moveTo(width / 2, 159);
  ctx.lineTo(width / 2 + 7, 165);
  ctx.lineTo(width / 2, 171);
  ctx.lineTo(width / 2 - 7, 165);
  ctx.closePath();
  ctx.fill();

  // 4. Main Certificate Title
  ctx.font = 'bold 42px "Plus Jakarta Sans", serif';
  ctx.fillStyle = '#0A192F';
  ctx.letterSpacing = '1px';
  ctx.fillText('CERTIFICATE OF PLACEMENT EXCELLENCE', width / 2, 230);

  // Subtitle
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.letterSpacing = '3px';
  ctx.fillText('THIS OFFICIAL ACCREDITATION IS CONFERRED UPON', width / 2, 275);

  // 5. Candidate Name (Dynamically measured and clamped so it never overlaps or breaks)
  let nameFontSize = 52;
  ctx.font = `bold ${nameFontSize}px "Plus Jakarta Sans", sans-serif`;
  let nameWidth = ctx.measureText(data.candidateName).width;
  while (nameWidth > 900 && nameFontSize > 28) {
    nameFontSize -= 2;
    ctx.font = `bold ${nameFontSize}px "Plus Jakarta Sans", sans-serif`;
    nameWidth = ctx.measureText(data.candidateName).width;
  }
  ctx.fillStyle = '#0F2942';
  ctx.letterSpacing = '1px';
  ctx.fillText(data.candidateName, width / 2, 360);

  // Underline under Candidate Name
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - Math.min(nameWidth / 2 + 40, 480), 380);
  ctx.lineTo(width / 2 + Math.min(nameWidth / 2 + 40, 480), 380);
  ctx.stroke();

  // 6. Citation Narrative
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#1E3A8A';
  ctx.letterSpacing = '0.5px';
  ctx.fillText(
    'for successfully demonstrating verified algorithmic rigor, complex problem-solving speed, and verified placement competence in',
    width / 2,
    430
  );

  // Level & Day Title
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0A192F';
  ctx.letterSpacing = '1px';
  ctx.fillText(
    `DAY ${data.dayNumber} · LEVEL ${data.levelNumber}: ${data.levelTitle.toUpperCase()}`,
    width / 2,
    485
  );

  // Difficulty Tier and Badge Announcement
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.letterSpacing = '2px';
  ctx.fillText(
    `DIFFICULTY: ${data.difficulty.toUpperCase()} TIER  |  BADGE CONFERRED: "${data.badgeName.toUpperCase()}"`,
    width / 2,
    525
  );

  // 7. Executive Metrics Triad (Clean rectangular plaques, zero overlapping)
  const boxWidth = 280;
  const boxHeight = 85;
  const boxY = 570;
  const startX = width / 2 - (boxWidth * 3 + 40 * 2) / 2;

  const metrics = [
    { label: 'CURRICULUM LEVEL', val: `Level ${data.levelNumber} / 30`, accent: '#1E3A8A' },
    { label: 'STAGE XP EARNED', val: `+${data.xpReward} XP`, accent: '#DC2626' },
    { label: 'TOTAL LIFETIME XP', val: `${data.totalXP.toLocaleString()} XP`, accent: '#D97706' },
  ];

  metrics.forEach((m, idx) => {
    const curX = startX + idx * (boxWidth + 40);

    // Box Background
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.fillRect(curX, boxY, boxWidth, boxHeight);
    ctx.strokeRect(curX, boxY, boxWidth, boxHeight);

    // Accent top border
    ctx.fillStyle = m.accent;
    ctx.fillRect(curX, boxY, boxWidth, 3);

    // Box Text
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(m.label, curX + boxWidth / 2, boxY + 28);

    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = m.accent;
    ctx.letterSpacing = '0.5px';
    ctx.fillText(m.val, curX + boxWidth / 2, boxY + 62);
  });

  // 8. Footer Section (Signatures, Seal, & Security ID)
  const footerY = 820;

  // --- Left: Primary Signatory (Kapil Narula) ---
  ctx.textAlign = 'left';
  // Decorative Script-Like Signature simulation
  ctx.font = 'italic bold 28px "Georgia", serif';
  ctx.fillStyle = '#0A192F';
  ctx.fillText('Kapil Narula', 160, footerY + 50);

  ctx.strokeStyle = '#0F2942';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(160, footerY + 65);
  ctx.lineTo(430, footerY + 65);
  ctx.stroke();

  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0F2942';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('KAPIL NARULA', 160, footerY + 86);

  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('Director & Mission Principal, DSAPTIQ', 160, footerY + 104);

  // --- Center: Official Gold & Crimson Corporate Seal ---
  const sealX = width / 2;
  const sealY = footerY + 60;
  const sealR = 64;

  // Outer gold starburst ring
  ctx.save();
  ctx.translate(sealX, sealY);
  ctx.fillStyle = '#D97706';
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    ctx.beginPath();
    ctx.moveTo(sealR - 4, 0);
    ctx.lineTo(sealR + 6, 3);
    ctx.lineTo(sealR - 4, 6);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Seal Body (Deep Navy)
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#0A192F';
  ctx.fill();

  // Inner Gold Ring
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 10, 0, Math.PI * 2);
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Seal Text
  ctx.textAlign = 'center';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F8FAFC';
  ctx.letterSpacing = '1px';
  ctx.fillText('VERIFIED PLACEMENT', sealX, sealY - 18);
  ctx.font = 'extrabold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('DRAPTI', sealX, sealY + 2);
  ctx.font = 'bold 8px "JetBrains Mono", monospace';
  ctx.fillStyle = '#D97706';
  ctx.fillText('SARLAYASH MISSION', sealX, sealY + 18);
  ctx.fillText('★ 2026 ★', sealX, sealY + 30);

  // --- Right: Board Certification & Security Verification ---
  ctx.textAlign = 'right';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#0A192F';
  ctx.fillText('SARLAYASH EXCELLENCE COUNCIL', width - 160, footerY + 50);

  ctx.strokeStyle = '#0F2942';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 430, footerY + 65);
  ctx.lineTo(width - 160, footerY + 65);
  ctx.stroke();

  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText(`ISSUED: ${data.issuedDate}`, width - 160, footerY + 86);

  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.fillText(`CREDENTIAL ID: ${data.certificateId}`, width - 160, footerY + 104);

  // Micro Security Legend at the absolute bottom
  ctx.textAlign = 'center';
  ctx.font = '500 10px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748B';
  ctx.letterSpacing = '1px';
  ctx.fillText(
    'DOCUMENT CRYPTOGRAPHICALLY RECORDED UNDER SARLAYASH VOCATIONAL READINESS CHARTER · VERIFIABLE AT DSAPTIQ.ACADEMY',
    width / 2,
    1072
  );
}

export interface BadgeData {
  badgeName: string;
  badgeTitle: string;
  badgeTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Apex';
  levelNumber: number;
  dayNumber: number;
  candidateName: string;
}

/**
 * Renders a high-resolution 800 x 800 px circular corporate badge medallion in PNG format.
 * Zero text overlapping, balanced geometric laurel wreath, precision typography.
 */
export function renderBadgeToCanvas(
  data: BadgeData,
  canvas: HTMLCanvasElement
): void {
  const size = 800;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  // Tier color mapping
  const tierColors: Record<BadgeData['badgeTier'], { primary: string; secondary: string; ring: string }> = {
    Bronze: { primary: '#0A192F', secondary: '#B45309', ring: '#D97706' },
    Silver: { primary: '#0F2942', secondary: '#475569', ring: '#94A3B8' },
    Gold: { primary: '#0A192F', secondary: '#D97706', ring: '#F59E0B' },
    Diamond: { primary: '#0A192F', secondary: '#2563EB', ring: '#60A5FA' },
    Apex: { primary: '#0A192F', secondary: '#DC2626', ring: '#EF4444' }
  };

  const scheme = tierColors[data.badgeTier] || tierColors.Gold;

  // 1. Outer 32-point Medallion Starburst
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = scheme.ring;
  const points = 32;
  for (let i = 0; i < points; i++) {
    ctx.rotate((Math.PI * 2) / points);
    ctx.beginPath();
    ctx.moveTo(330, 0);
    ctx.lineTo(358, 6);
    ctx.lineTo(330, 12);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // 2. Main Outer Circular Plaque
  ctx.beginPath();
  ctx.arc(cx, cy, 332, 0, Math.PI * 2);
  ctx.fillStyle = scheme.primary;
  ctx.fill();

  // Outer Gold/Tier Ring
  ctx.strokeStyle = scheme.ring;
  ctx.lineWidth = 6;
  ctx.stroke();

  // Second Inner Inset Ring
  ctx.beginPath();
  ctx.arc(cx, cy, 308, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 3. Laurel Wreath Sprigs
  const drawLaurel = (angleOffset: number, flip: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(flip, 1);
    ctx.fillStyle = scheme.ring;
    for (let a = 40; a <= 140; a += 16) {
      const rad = (a * Math.PI) / 180;
      const lx = Math.cos(rad) * 260;
      const ly = Math.sin(rad) * 260;
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rad + 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  };

  drawLaurel(0, 1);
  drawLaurel(0, -1);

  // 4. Center Core Medallion
  ctx.beginPath();
  ctx.arc(cx, cy, 185, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(cx, cy - 40, 20, cx, cy, 185);
  coreGrad.addColorStop(0, '#1E293B');
  coreGrad.addColorStop(1, '#0A192F');
  ctx.fillStyle = coreGrad;
  ctx.fill();

  ctx.strokeStyle = scheme.secondary;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 5. Center Emblems & Level Number
  ctx.textAlign = 'center';

  // Sub-header
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#DC2626';
  ctx.letterSpacing = '2px';
  ctx.fillText('DAY ' + data.dayNumber + ' · DSAPTIQ', cx, cy - 85);

  // Big Level Number
  ctx.font = 'extrabold 88px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${data.levelNumber}`, cx, cy + 10);

  // Level Subtext
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillStyle = scheme.ring;
  ctx.letterSpacing = '3px';
  ctx.fillText('LEVEL COMPLETED', cx, cy + 42);

  // Tier Badge
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(data.badgeTier.toUpperCase() + ' TIER', cx, cy + 68);

  // 6. Lower Curved / Ribbon Badge Title
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(cx - 240, cy + 185, 480, 52);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 240, cy + 185, 480, 52);

  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.letterSpacing = '1px';
  ctx.fillText(data.badgeName.toUpperCase(), cx, cy + 218);

  // 7. Micro Inscription of Candidate Name
  if (data.candidateName) {
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillStyle = '#E2E8F0';
    ctx.letterSpacing = '1px';
    ctx.fillText(`AWARDED TO: ${data.candidateName.toUpperCase()}`, cx, cy + 265);
  }
}

/**
 * Triggers a browser download of the certificate as a high-resolution PNG image.
 */
export function downloadCertificatePNG(data: CertificateData): void {
  const canvas = document.createElement('canvas');
  renderCertificateToCanvas(data, canvas);

  const safeName = data.candidateName.replace(/[^a-zA-Z0-9]/g, '_') || 'Candidate';
  const fileName = `DSAPTIQ_Level_${data.levelNumber}_Certificate_${safeName}.png`;

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Triggers a browser download of the level badge as a high-resolution PNG image.
 */
export function downloadBadgePNG(data: BadgeData): void {
  const canvas = document.createElement('canvas');
  renderBadgeToCanvas(data, canvas);

  const safeBadge = data.badgeName.replace(/[^a-zA-Z0-9]/g, '_') || 'Badge';
  const fileName = `DSAPTIQ_Day_${data.dayNumber}_Level_${data.levelNumber}_Badge_${safeBadge}.png`;

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
