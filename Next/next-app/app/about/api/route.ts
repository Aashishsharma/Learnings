// export const dynamic = "force-dynamic";
export const revalidate = 15;
export async function GET() {
  console.log("api call made");
  return Response.json({ message: Date.now() });
}
