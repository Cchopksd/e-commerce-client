"use server";

export default async function fetchAllProduct({
  search,
  page,
}: {
  search: string | any;
  page: number;
}) {
  const hostname = process.env.HOST_NAME;
  try {
    const resource = await fetch(
      `${hostname}/product?search=${search}&page=${page}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const result = await resource.json();
    if (!resource.ok) {
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}
