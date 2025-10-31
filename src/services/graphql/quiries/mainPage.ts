export const GET_MAIN_PAGE_BLOCKS = `
  query GetMainPageBlocks {
    page(id: "home", idType: URI) {
      id
      title
      mainPage {
        bloks {
          typeBloka
          title
          categoryMain
          
          # Последний слайд для товарных блоков
          lastSlaid {
            img {
              node {
                sourceUrl
                altText
              }
            }
            title
            btn
          }
          
          # Главный слайдер
          slider {
            title
            content
            images {
              desctop {
                node {
                  sourceUrl
                  altText
                }
              }
              mobile {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          
          # Преимущества
          features {
            icon {
              node {
                sourceUrl
                altText
              }
            }
            title
            content
          }
          
          # Изображение для блока "О проекте"
          image {
            node {
              sourceUrl
              altText
            }
          }
          
          # Бегущая строка с логотипами
          marquee {
            img {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_MAIN_PAGE_SLIDER = `
  query GetMainPageSlider {
    page(id: "home", idType: URI) {
      mainPage {
        bloks {
          typeBloka
          slider {
            title
            content
            images {
              desctop {
                node {
                  sourceUrl
                  altText
                }
              }
              mobile {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;