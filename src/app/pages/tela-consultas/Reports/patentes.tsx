/* eslint-disable @typescript-eslint/no-unused-vars */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IListagemPatente } from "app/shared/services/api/patente/PatenteService";

export const patentesPDF = (patentes: IListagemPatente[]) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitile = [
    {
      text: "Patentes",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, rigth, bottom
    },
  ];
  const dados = patentes.map((patente) => {
    return [
      { text: patente.PROTOCOLO, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.NATUREZA, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.DEPOSITO, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.TITULO, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.INVENTORES, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.IPC, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.CPC, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.COTITULAR, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.QREIVIND, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.STATUS, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.PROCESSO, fontSize: 10, margin: [0, 2, 0, 2] },
      { text: patente.CONCESSAO, fontSize: 10, margin: [0, 2, 0, 2] },
    ];
  });
  const details = [
    {
      table: {
        headerRows: 1,
        widths: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        body: [
          [
            { text: "Protocolo", style: "tableHeader", fontSize: 10 },
            { text: "Natureza", style: "tableHeader", fontSize: 10 },
            { text: "Depósito", style: "tableHeader", fontSize: 10 },
            { text: "Titulo", style: "tableHeader", fontSize: 10 },
            { text: "Inventores", style: "tableHeader", fontSize: 10 },
            { text: "Ipc", style: "tableHeader", fontSize: 10 },
            { text: "Cpc", style: "tableHeader", fontSize: 10 },
            { text: "Cotitular", style: "tableHeader", fontSize: 10 },
            { text: "QReivind", style: "tableHeader", fontSize: 10 },
            { text: "Processo", style: "tableHeader", fontSize: 10 },
            { text: "Concessão", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];
  function Rodape(currentPage: string, pageCount: string) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        fontSize: 9,

        margin: [0, 10, 20, 0], // left, top, rigth, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitile],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).download();
};
