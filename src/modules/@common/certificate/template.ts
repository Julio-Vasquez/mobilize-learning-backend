import { join } from 'path';

export const Template = (name: string, lastName: string, id: number) => {
  const gvr = join(__dirname, 'GreatVibesRegular.ttf');
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        @font-face {
          font-family: "great vibes";
          src: url(${gvr});
        }
        body {
          height: 1080px;
          background-image: url('https://i.ibb.co/Zx1JL37/Base.png');
          background-size: 100% 100%;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }

        h3,
        h5 {
          text-align: center;
          color: #FF3333;
          font-family: 'great vibes';
        }

        h3 {
          padding-top: 420px;
          font-size: 80px;
        }

        h5 {
          margin-top: -50px;
          font-size: 38px;
        }

        p {
          font-weight: bold !important;
        }
      </style>
    </head>

    <body>
      <h3>${name} ${lastName}</h3>
      <h5>Con número de identificación : <span>${id}</span></h5>
    </body>
  </html>
  `;
}