import cors from "cors"

const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")

const feedback = document.getElementById("error")
feedback.style.display = "none"

cors(origin="*")


const getData = async () =>{
    try{
        const currency_key = "rc_live_0a9360a2fcec450b88691545d1c7e709";
        const currency_url = "https://api.restcountries.com/countries/v5?q=canada";

        const response = await fetch(currency_url,{
            headers: {
                Authorization: `Bearer ${currency_key}`
            }
        });
        console.log("HTTP status:", response.status);
        
        if(!response.ok){
            feedback.textContent = "Error occured while fetching data";
            throw new Error("Error occured");
        }

        const data  = await response.json();

        return data ;

    }
    catch(error){
        console.log("Error:", error.message)
    }
} 

const populateDropdown = async () => {

    const data = (await getData()).data.objects;

    // const countries = data.map(country => country.names.common);

    // const currencies = data.map(country => country.currencies);
    
    // const flags = data.map(country=> country.flag.emoji); 

    data.forEach(country => {
        const flag = country.flag.emoji;
        Object.entries(country.currencies).forEach(([code, curr])=>{
            const text = `${flag} ${code} - ${curr.name}`;
            const option = new Option(text, code);
            fromCurrency.add(option);
            toCurrency.add(option.cloneNode(true));
        })
    }
    )
}
populateDropdown();



const conversion = async () =>{
    try{

        let amount = document.getElementById("input").value;

        if(isNaN(amount) || amount < 0){
            feedback.style.display = "block"
            return;
        }

        const conversion_key = "940322a0cb9c335e7dcfc369";
        const conversion_url = `https://v6.exchangerate-api.com/v6/${conversion_key}/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`;

        const response = await fetch(conversion_url)

        if (!response.ok){
            feedback.textContent = "Error occured while fetching conversion api";
            throw new Error("Error occured");
        }
        const result = await response.json();
        document.getElementById("result").textContent = result.conversion_result;
    }
    catch(error){
        console.log("Error:",error.message)
    }
}

const convert = document.getElementById("convert")
convert.addEventListener("click", conversion);


// {
//   "data": {
//     "objects": [
//       {
//         "names": {
//           "common": "United States"
//         },
//         "currencies": {
//           "USD": {
//             "name": "United States dollar",
//             "symbol": "$"
//           }
//         },
//         "flag": {
//           "emoji": "ðŸ‡ºðŸ‡¸",
//           "description": "The flag of the United States"
//         }
//       },
//       {
//         "names": {
//           "common": "India"
//         },
//         "currencies": {
//           "INR": {
//             "name": "Indian rupee",
//             "symbol": "â‚¹"
//           }
//         },
//         "flag": {
//           "emoji": "ðŸ‡®ðŸ‡³",
//           "description": "The flag of India"
//         }
//       }
//     ],
//     "meta": {
//       "total": 249,
//       "count": 2,
//       "limit": 2,
//       "offset": 0,
//       "more": true
//     }
//   }
// }
