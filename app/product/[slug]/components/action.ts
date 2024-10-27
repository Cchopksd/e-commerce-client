export const fetchProductByID = async (id: string | undefined) => {
  const hostname = process.env.HOST_NAME;
  try {
    const resource = await fetch(`${hostname}/product/get-by-id/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await resource.json();
    if (!resource.ok) {
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
