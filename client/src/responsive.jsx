import { css } from 'styled-components';

// Tái sử dụng nó ở component hoặc bất cứ pages nào
// hoạt động tốt ở mức dưới 380px
export const mobile = props => {
    return css`
        @media only screen and (max-width: 380px) {
            ${props}
        }
    `;
};

// Nếu làm cho tablet
// // hoạt động tốt ở mức dưới 640px

// export const tablet = props => {
//     return css`
//         @media only screen and (max-width: 640px) {
//             ${props}
//         }
//     `;
// };
