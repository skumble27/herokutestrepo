function unPackData(id){
    d3.json('/worlddata').then(function(data){

        console.log(id)
        // Checking to see if the dataset loads
        console.log(data);


        // Check to see if data based on country has been filtered
        let selectedCountry = data.filter(nation => nation.country === id);
        console.log(selectedCountry);

        
        // Creating a time parse for date
        var parseTime = d3.timeParse("%d/%m/%Y")
        // Creating set of Y axis arrays
        
        let co2 = []
        let agriEmp = []
        let cashCrop = []
        let childMort = []
        let gdp = []
        let hivCases = []
        let hivDeaths = []
        let lifeExpect = []
        let mentalHealth = []
        let obesityRates = []
        let population = []
        let stapleCrops = []

        // Creating the x-axis
        let year = []

        // Iterating through the Filtered dataset objects
        Object.keys(selectedCountry).forEach(function(key){
            co2.push(selectedCountry[key].co2_emm_tonnes);
            agriEmp.push(selectedCountry[key].agri_employment);
            cashCrop.push(selectedCountry[key].cash_crop_kg_ha);
            childMort.push(selectedCountry[key].child_mortality_rates);
            gdp.push(selectedCountry[key].gdp);
            hivCases.push(selectedCountry[key].hiv_cases);
            hivDeaths.push(selectedCountry[key].hivdeaths);
            lifeExpect.push(selectedCountry[key].life_expectency);
            mentalHealth.push(selectedCountry[key].mental_health);
            obesityRates.push(selectedCountry[key].obesity_rates);
            population.push(selectedCountry[key].population);
            stapleCrops.push(selectedCountry[key].staple_crop_kg_ha);       
            year.push(parseTime(selectedCountry[key]._date));

            })

        console.log(year);
        console.log(gdp);

        // GDP and Co2 Emissions
        var gdpTrace = {
            type:'scatter',
            mode:'lines',
            name:'GDP',
            x:year,
            y:gdp,
            line:{color:'#96fffc'}
        }

        var co2Trace = {
            type:'scatter',
            mode:'lines',
            name:'Co2 Emissions',
            x:year,
            y:co2,
            line:{color:'#ff91d3'},
            yaxis:'y2'
        }
        
        var data = [gdpTrace, co2Trace];

        var layout = {
            title: 'GDP and Co2 Emissions',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'Gross Domestic Product',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'Co2 Emissions',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
                

            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };
        Plotly.newPlot('gdpco2', data, layout);

        // HIV Cases
        var hivTrace = {
            type:'scatter',
            mode:'lines',
            name:'HIV Cases',
            x:year,
            y:hivCases,
            line:{color:'#96fffc'}
        }

        var hivDeathsTrace = {
            type:'scatter',
            mode:'lines',
            name:'Co2 Emissions',
            x:year,
            y:hivDeaths,
            line:{color:'#ff91d3'},
            yaxis:'y2'
        }
        
        var data1 = [hivTrace, hivDeathsTrace];

        var layout1 = {
            title: 'HIV Cases and Deaths',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'HIV Cases',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'HIV Deaths',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
                

            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };
                
        Plotly.newPlot('hivcases', data1, layout1);

        // Life Expectency and Child Mortality rates
        var lifeTrace = {
            type:'scatter',
            mode:'lines',
            name:'Life Expectency',
            x:year,
            y:lifeExpect,
            line:{color:'#96fffc'}
        }

        var childTrace = {
            type:'scatter',
            mode:'lines',
            name:'Child Mortality Rates',
            x:year,
            y:childMort,
            line:{color:'#ff91d3'},
            yaxis:'y2'
        }
        
        var data2 = [lifeTrace,childTrace];

        var layout2 = {
            title: 'Life Expectency and Child Mortality Rates',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'Life Expectency',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'Child Mortality Rates',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
                

            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };

        
        Plotly.newPlot('lifechild', data2, layout2);
                            
        // Agricultural Data
        var stapleCropTrace = {
            type:'scatter',
            mode:'lines',
            name:'Staple Crop Yield',
            x:year,
            y:stapleCrops,
            line:{color:'#96fffc'}
        }

        var cashCropTrace = {
            type:'scatter',
            mode:'lines',
            name:'Child Mortality Rates',
            x:year,
            y:cashCrop,
            line:{color:'#ff91d3'},
            yaxis:'y2'
        }
        
        var data3 = [stapleCropTrace,cashCropTrace];

        var layout3 = {
            title: 'Staple vs Cash Crop Yield',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'Staple Crops',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'Cash Crops',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
                

            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };
        
        Plotly.newPlot('agriculture', data3, layout3);
        
        // Mental Health
        var mentalHealthTrace = {
            type:'scatter',
            mode:'lines',
            name:'Mental Health',
            x:year,
            y:mentalHealth,
            line:{color:'#96fffc'}
        }

        var populationTrace = {
            type:'scatter',
            mode:'lines',
            name:'Population',
            x:year,
            y:population,
            line:{color:'#ff91d3'},
            yaxis:'y2'
        }
        
        var data4 = [mentalHealthTrace, populationTrace];

        var layout4 = {
            title: 'Rates of Mental Health Issues in the Total Population',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'Mental Health (%)',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'Population',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };
        
        Plotly.newPlot('mentalhealth', data4, layout4);

        // Obesity
        var obesityTrace = {
            type:'scatter',
            mode:'lines',
            name:'Obesity Rates',
            x:year,
            y:obesityRates,
            line:{color:'#96fffc'}
        }
        
        var data5 = [obesityTrace, populationTrace];

        var layout5 = {
            title: 'Obesity Rates in the Total Population',
            showlegend: true,
            legend: {
                y: 0.5,
                x:1.2
            },
            font:{
                color:'#f5f5dc',
                family:'Arial'
            },
            yaxis: {title: 'Obesity Rates (%)',
                    titlefont:{color: '#96fffc'},
                    tickfont:{color:'#96fffc'},
                    showgrid:false,
                    gridcolor:'#96fffc',
                    zerolinecolor:'#f5f5dc'
            
            },
            yaxis2: {
              title: 'Population',
              titlefont: {color: '#ff91d3'},
              tickfont: {color: '#ff91d3'},
              overlaying: 'y',
              side: 'right',
              showgrid:false,
              gridcolor:'#ff91d3',
              zerolinecolor:'#f5f5dc'
            },
            xaxis:{
                autorange: true,
                range:[1961,2018],
                rangeslider: {range: ['1961', '2018']},
                type: 'date',
                shogrid:true,
                gridcolor:'#f5f5dc',
                tickfont:{color:'#f5f5dc'},
                zerolinecolor:'#f5f5dc'
            },
            paper_bgcolor: '#302c30',
            plot_bgcolor:  '#302c30'

        };
        Plotly.newPlot('obesity', data5, layout5);         
        

    })

}
