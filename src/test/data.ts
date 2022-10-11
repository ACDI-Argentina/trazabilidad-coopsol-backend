export const trace1 = { 
  id: "trace-test",
  product: {
    name: "Miel orgánica monoflora de Atamisqui Wayra Wayra 440gr",
    lot: "12345",
    item: "20200812102834140"
  },
  events: [
    {
      type: "Fraccionado",
      date: "2022-03-17T03:00:00.000Z",
      inputs: [
        "Tambor de miel TO-0004",
      ],
      outputs: [
        "Frasco de miel Wayra 440gr FR-0005",
        "Frasco de miel Wayra 200gr FR-0006",
        "Frasco de miel Wayra 400gr FR-0007",
      ]
    },
    {
      type: "Homogeneizado",
      date: "2022-03-16T03:00:00.000Z",
      inputs: [
        "Tambor de miel TO-0002",
        "Tambor de miel TO-0003"
      ],
      outputs: [
        "Tambor de miel TH-0004"
      ]
    },
    {
      type: "Extraccion",
      date: "2022-03-15T03:00:00.000Z",
      inputs: [
        "Alza A-0001"
      ],
      outputs: [
        "Tambor de miel TO-0002"
      ]
    },
    {
      type: "Ingreso Alza",
      date: "2022-03-15T03:00:00.000Z",
      inputs: [
        "Alza A-0001"
      ],
      //Remito de asociacion con el productor, y apiario
    },
  ],
  sources: [
    {
      name: "Apiario CM 7 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63491,
        lng: -64.40391
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    },
    {
      name: "Apiario CM 8 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63267,
        lng: -64.40334
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    },
    {
      name: "Apiario CM 9 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63267,
        lng: -64.41022
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    }
  ]
}


export const trace1Altered = {  //Es equivalente a la anterior pero tiene un dato modificado
  id: "trace-test",
  product: {
    name: "Miel orgánica monoflora de Atamisqui Wayra Wayra 440gr",
    lot: "12345",
    item: "20200812102834140"
  },
  events: [
    {
      type: "Fraccionado",
      date: "2022-03-17T03:00:00.000Z",
      inputs: [
        "Tambor de miel TO-0004",
      ],
      outputs: [
        "Frasco de miel Wayra 440gr FR-0005",
        "Frasco de miel Wayra 200gr FR-0006",
        "Frasco de miel Wayra 400gr FR-0008",
      ]
    },
    {
      type: "Homogeneizado",
      date: "2022-03-16T03:00:00.000Z",
      inputs: [
        "Tambor de miel TO-0002",
        "Tambor de miel TO-0003"
      ],
      outputs: [
        "Tambor de miel TH-0004"
      ]
    },
    {
      type: "Extraccion",
      date: "2022-03-15T03:00:00.000Z",
      inputs: [
        "Alza A-0001"
      ],
      outputs: [
        "Tambor de miel TO-0002"
      ]
    },
    {
      type: "Ingreso Alza",
      date: "2022-03-15T03:00:00.000Z",
      inputs: [
        "Alza A-0001"
      ],
      //Remito de asociacion con el productor, y apiario
    },
  ],
  sources: [
    {
      name: "Apiario CM 7 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63491,
        lng: -64.40391
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    },
    {
      name: "Apiario CM 8 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63267,
        lng: -64.40334
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    },
    {
      name: "Apiario CM 9 | CAMPO AMOR(4230) - SE",
      geolocation: {
        lat: - 28.63267,
        lng: -64.41022
      },
      beekeper: "Villa Victor Edilberto(20 - 18495202 - 6)"
    }
  ]
}
