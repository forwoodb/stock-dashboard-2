export async function POST() {
  await fetch("localhost:8000/get_stocks");
}
