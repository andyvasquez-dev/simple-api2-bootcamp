const input = document.querySelector('input')
const current = document.querySelector('#current')

function fetchData(){

  const stockData=[]
  let stockValues = ""
  let dataStartDate
  let dataEndDate
  let symbol =  input.value.toString().toLowerCase()

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&outputsize=compact&apikey=JTFWK0ZZMZCGU7JE`)
    .then(response=>response.json())
    .then(data=>{

      stockData.push( Object.entries(data[`Time Series (60min)`]))
      // console.log(stockData);
      dataStartDate = stockData[0][0][0].slice(0,10) // closer to current date
      dataEndDate = stockData[0][99][0].slice(0,10) // oldest date, approximately 2 weeks back

      stockData[0].forEach( (item, index) => {
        if (index<50) {
          stockValues += ((Math.round((parseFloat(item[1]['4. close']))/10)).toString()) + ","
        }
      })
      // console.log(stockValues)
      current.textContent= (Math.round(parseFloat(stockData[0][0][1]['4. close']))) + ' $'
      // stockData[0].forEach( (item, index) => {  stockValues += (parseFloat(item[1]['4. close']).toFixed(2).toString()) + ", " })
    })
}

input.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    if (input.value){
      fetchData();
    }
  }
})
