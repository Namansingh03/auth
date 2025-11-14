export async function generateOtp(){
  const n = Math.floor(Math.random() * 1_000_000);
  return n.toString().padStart(6, "0"); 
}