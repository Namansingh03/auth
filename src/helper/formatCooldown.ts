export const formatCooldown = (seconds : number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins > 0) return `${mins} min ${secs} sec`;
  return `${secs} sec`;
};