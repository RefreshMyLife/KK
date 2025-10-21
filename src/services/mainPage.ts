import { wpGraphQL, wpRest } from "@/lib/wordpress";

export async function getMainPage() {
  const query = `
    query MainPage {
      page(id: "home", idType: URI) {
        id
        title
        mainPage {
          bloks {
            typeBloka
            # остальной контент, кроме слайдера
            rs_auction {
              title
            }
          }
        }
      }
    }
  `;
  return wpGraphQL(query);
}

// export async function getMainSlider() {
//   const page = await wpRest(`wp/v2/pages/117?acf_format=standard`);
//   const blocks = page?.acf?.bloks || [];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return blocks.find((b: any) => Array.isArray(b.slider))?.slider || [];
// }