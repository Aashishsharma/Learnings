//export const dynamic = "force-dynamic"; // default value for this is auto
// if we don't set dynamic to force-dynmic, we will get stale value
export const GET = () => {
  return Response.json({
    time: new Date(),
    newTime: "abc",
  });
};

// export const config = {
//   matcher: ["/about/*", "/about/:path*"],
// };
