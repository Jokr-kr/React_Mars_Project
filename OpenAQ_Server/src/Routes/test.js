fetch('https://hplussport.com/api/products?qty=2&order=name')
    .then(function (response)
    {
        return response.json();

    })
    .then(function (jsonData)
    {
        console.log(jsonData)
        var name = jsonData[0].name;
        console.log(name)
        var product = document.cre("li")
        product.innerHTML = name;
        documen.body.appendChild(product)
    })




fetch('https://hplussport.com/api/products?order=name')
    .then(function (response)
    {
        return response.json();

    })
    .then(function (jsonData)
    {
        for (items in jsonData)
        {
            var productName = jsonData[item].name;
            var products = document.createElement("li");
            product.innerHTML = productName;
            document.body.appendChild(products)

            var productImg = jsonData[items].image;
            var image = document.createElement("img");
            image.setAttribute('src', productImg);
            document.body.appendChild(image);

        }

    })