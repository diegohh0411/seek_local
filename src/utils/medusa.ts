export const getSDKFactory = async () => {
  const Medusa = (await import("@medusajs/js-sdk")).default;

  return new Medusa({
    baseUrl: "http://localhost:9000",
    debug: true,
    publishableKey: "pk_c83bbf801edbc78546c2b26276ab80d6bd6651f3898d8fa429587526a02b6ab5",
  });;
}

