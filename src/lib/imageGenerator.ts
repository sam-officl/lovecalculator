export async function downloadResultAsImage(
  name1: string,
  name2: string,
  score: number,
  message: string
): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#fce7f3');
  gradient.addColorStop(0.5, '#fecdd3');
  gradient.addColorStop(1, '#fee2e2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.arc(200, 200, 150, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 192, 203, 0.3)';
  ctx.beginPath();
  ctx.arc(900, 850, 200, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ec4899';
  ctx.font = 'bold 72px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('💕 Love Calculator 💕', 540, 150);

  ctx.fillStyle = '#333333';
  ctx.font = 'bold 96px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name1, 540, 400);

  ctx.fillStyle = '#ec4899';
  ctx.font = 'bold 80px Poppins, sans-serif';
  ctx.fillText('+', 540, 500);

  ctx.fillStyle = '#333333';
  ctx.font = 'bold 96px Poppins, sans-serif';
  ctx.fillText(name2, 540, 600);

  ctx.fillStyle = '#ec4899';
  ctx.font = 'bold 140px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score + '%', 540, 800);

  ctx.fillStyle = '#666666';
  ctx.font = 'bold 48px Poppins, sans-serif';
  ctx.fillText(message, 540, 900);

  ctx.fillStyle = '#999999';
  ctx.font = '28px Poppins, sans-serif';
  ctx.fillText('lovecalculator.fun', 540, 1000);

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name1}-${name2}-${score}percent-love.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
}
