function topTenCountries(id){
    d3.json('/worlddata').then(function(data){
      
      // Checking to see if the dataset loads
      console.log(data);
      // Seeing if the country selected from the map appears in this function
      console.log(`Country called in function topTenCountries ${id}`);
  
      // Dataset filtered by year
      let _2018Data = data.filter(year => year._date === '1/01/2018');
      console.log(_2018Data);
  
      // Dataset for filtered country
      let countryFilter = _2018Data.filter(nation => nation.country === id);
      console.log(countryFilter);
  
      // Selection top ten countries based on GDP in 2018
      let topTenGDP = _2018Data.sort(function (a,b) {return d3.descending(a.gdp, b.gdp);}).slice(0,10);
      console.log(topTenGDP);
  
      // Selecting top ten countries based on Life Expectency
      let topTenLife = _2018Data.sort(function (a,b) {return d3.descending(a.life_expectency, b.life_expectency);}).slice(0,10);
      console.log(topTenLife);
  
      // Selecting top ten countries based on Population
      let toptenPopulation = _2018Data.sort(function (a,b) {return d3.descending(a.population, b.population);}).slice(0,10);
      console.log(toptenPopulation);
  
      // Need to create an array of countries, gdp, population and lifeexpectency
      let population = []
      let gdp = []
      let lifeexpectency = []
      let countriesGDP = []
      let countriesLife = []
      let countriesPOP = []

      // This function will be used to remove countries that are already within the array to prevent duplicates in the bar chart
      function duplicateRemoval(clones){
        let unique = [];
        clones.forEach(element => {
          if (!unique.includes(element)){
            unique.push(element)
          }
        });
        return unique;
      }
  
      // Iterating through the objects to obtain list of countries for GDP
      Object.keys(topTenGDP).forEach(function(key){
        gdp.push(topTenGDP[key].gdp);
        countriesGDP.push(topTenGDP[key].country)
        
      })
  
      // Iterating through the objects to obtain list of countries for Population
      Object.keys(toptenPopulation).forEach(function(key){
        population.push(toptenPopulation[key].population);
        countriesPOP.push(toptenPopulation[key].country)
        
      })
  
  
      // Iterating through the objects to obtain list of countries for Life Expectency
      Object.keys(topTenLife).forEach(function(key){
        lifeexpectency.push(topTenLife[key].life_expectency);
        countriesLife.push(topTenLife[key].country)
        
      })
  
      // Adding the filtered country to the START of the list
      Object.keys(countryFilter).forEach(function(key){
  
        population.unshift(countryFilter[key].population);
        gdp.unshift(countryFilter[key].gdp);
        lifeexpectency.unshift(countryFilter[key].life_expectency);
        countriesGDP.unshift(countryFilter[key].country);
        countriesLife.unshift(countryFilter[key].country);
        countriesPOP.unshift(countryFilter[key].country);    
  
  
      })
  
  
  
      console.log(countriesPOP);
      console.log(population)
      console.log(countriesLife)
      console.log(lifeexpectency);
      console.log(countriesGDP);
      console.log(gdp);
      
      // Creating a GDP Barchart for the chosen country against the top ten countries
      // Creating multiple barcharts
      
      // This function will create a space between the subplots
      function getDomain(i) {
        var N = 3
        var spacing = 0.4
        
        return [
          (1 / N) * i + (i === 0 ? 0 : spacing / 2),
          (1 / N) * (i + 1) - (i === (N - 1) ? 0 : spacing / 2)
        ]
      }


      var tracePOP = 
        {
          x:duplicateRemoval(countriesPOP), // If a country like India or China is clicked, the values will double so the function removes the duplicates
          y:duplicateRemoval(population),
          type: 'bar',
          name: 'Population',
          marker:{
            color:'#f5c9ff'
          },
          
        };
        
      var traceGDP = 
        {
          x:duplicateRemoval(countriesGDP),
          y:duplicateRemoval(gdp),
          xaxis:'x2',
          yaxis:'y2',
          type: 'bar',
          name: 'Gross Domestic Product',
          marker:{
            color:'#c9fffe'
          }
        };
      
     var traceLife = 
        {
          x:duplicateRemoval(countriesLife),
          y:duplicateRemoval(lifeexpectency),
          xaxis:'x3',
          yaxis:'y3',
          type:'bar',
          name:'Life Expectency',
          marker:{
            color:'#c9ffcc'
          }
        }
  
      var data = [tracePOP,traceGDP, traceLife]
  
      var layout = {
        grid: {
            rows: 3,
            columns: 1,
            pattern: 'independent',
            roworder: 'bottom to top'},
        autosize: false,
        width: 1300,
        height: 650,
        font: {
          size:10,
          color:'#f5f5dc',
          family:"Arial"
        },
        paper_bgcolor: '#302c30',
        plot_bgcolor:  '#302c30',
        xaxis:{
          showgrid:true,
          gridcolor:'#f5f5dc'
        },
        yaxis:{
          showgrid:true,
          gridcolor:'#f5f5dc',
          domain: getDomain(0)
        },
        xaxis2:{
          showgrid:true,
          gridcolor:'#f5f5dc'
        },
        yaxis2:{
          showgrid:true,
          gridcolor:'#f5f5dc',
          domain: getDomain(1)
        },
        xaxis3:{
          showgrid:true,
          gridcolor:'#f5f5dc'
        },
        yaxis3:{
          showgrid:true,
          gridcolor:'#f5f5dc',
          domain: getDomain(2)
        },
        legend:{
          font:{
            size:16
          }
        }  
                
        };
  
      Plotly.newPlot('topten',data, layout);
    })
  }