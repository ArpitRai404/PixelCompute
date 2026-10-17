
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")

const feedback = document.getElementById("error")
feedback.style.display = "none"


const getData = async () => {
    try {
        const currency_key = "rc_live_64b88137c87f4e0baea6513e07a0bf70";
        const currency_url = "https://api.restcountries.com/countries/v5";

        const response = await fetch(currency_url, {
            headers: {
                Authorization: `Bearer ${currency_key}`
            }
        });
        console.log("HTTP status:", response.status);

        if (!response.ok) {
            feedback.textContent = "Error occured while fetching data";
            throw new Error("Error occured");
        }

        const data = await response.json();

        //console.log(data);

        return data;

    }
    catch (error) {
        console.log("Error:", error.message)
    }
}

const populateDropdown = async () => {

    const data = (await getData()).data.objects;

    data.forEach(country => {
        const flag = country.flag.emoji;
        Object.entries(country.currencies).forEach(([code, curr]) => {
            const text = `${flag} ${curr.code} - ${curr.name}`;
            const value = curr.code;
            const option = new Option(text, value);
            fromCurrency.add(option);
            toCurrency.add(option.cloneNode(true));
        })
    }
    )
    
}
populateDropdown();





const conversion = async () => {
    try {
        feedback.style.display = "none";

        let amount = parseFloat(document.getElementById("input").value);

        if (isNaN(amount) || amount < 0) {
            feedback.style.display = "block"
            return;
        }    

        const from = fromCurrency.value
        const to = toCurrency.value

        console.log("From:",from)
        console.log("To:",to)

        const conversion_key = "f1ed61e2fcbc7640a012fd6c";
        const conversion_url = `https://v6.exchangerate-api.com/v6/${conversion_key}/pair/${from}/${to}/${amount}`;

        const response = await fetch(conversion_url)

        if (!response.ok) {
            feedback.textContent = "Error occured while fetching conversion api";
            throw new Error("Error occured");
        }
        const result = await response.json();
        document.getElementById("result").textContent = result.conversion_result;
    }
    catch (error) {
        console.log("Error:", error.message)
    }
}

const convert = document.getElementById("convert")
convert.addEventListener("click", conversion);
