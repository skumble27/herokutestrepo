var svgWidth = 1060;
var svgHeight = 600;

var margin = {
  top: 50,
  right: 70,
  bottom: 110,
  left: 130
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Creating an SVG group that can be appended to the HTML document

// Declaring the SVG variable and setting the dimensions for the graphics
var svg = d3
  .select("#worldglance") // The ID tag in the HTML documen
  .append("svg")
  .attr("width", svgWidth) // Dimensions of the SVG have been establised 
  .attr("height", svgHeight); // As above



// Appending all the elements together in the SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Establishing the Initial x and y axis
var chosenXAxis = "staple_crop_kg_ha";
var chosenYAxis = "cash_crop_kg_ha";

/*------------------------------------ FUNCTIONS ------------------------------------ */
function xScale(healthData, chosenXAxis) {
    // Establishing the x axis scales (when different data are selected, the axis will change automatically)
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.9,
        d3.max(healthData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  }
  
  
  function yScale(healthData, chosenYAxis) {
    // As with the previous function, the y axis scales will be set up automatically when a different parameter is selected
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d[chosenYAxis]) - 1,
        d3.max(healthData, d => d[chosenYAxis]) + 1
      ])
      .range([height, 0]);
  
    return yLinearScale;
  }
  
// Animating the transition of the axis when a new variable is selected
  function renderXAxes(newXScale, xAxis) {
      // assigning the bottom axis labels
    var bottomAxis = d3.axisBottom(newXScale);
 
    
    //Animating the transition
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  
  function renderYAxes(newYScale, yAxis) {
    // Assigning the left axis labels
    var leftAxis = d3.axisLeft(newYScale);

    // Animating the transition
      yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
/*The next function will allow the circles, which represent the scatter plot, to transition when the axes
are changed */

  function renderXCircles(groupedCircles, newXScale, chosenXAxis) {
    
    
    groupedCircles.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return groupedCircles;
  }
  
  function renderYCircles(groupedCircles, newYScale, chosenYAxis) {
  
    groupedCircles.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return groupedCircles;
  }
 
  function renderXText(groupedCircles, newXScale, chosenXAxis) {
  
    groupedCircles.transition()
      .duration(1000)
      .attr("dx", d => newXScale(d[chosenXAxis]));
  
    return groupedCircles;
  }
  
  function renderYText(groupedCircles, newYScale, chosenYaxis) {
  
    groupedCircles.transition()
      .duration(1000)
      .attr("dy", d => newYScale(d[chosenYAxis])+5);
  
    return groupedCircles;
  }
  
  
  // This function will update the circles with new information when the mouse hovers over the datapoints
  function updateToolTip(groupedCircles, chosenXAxis, chosenYAxis) {
  
    var ylabel;
    var xlabel;

    if (chosenXAxis === "staple_crop_kg_ha") {
      xlabel = "Staple Crops";
      
    } 
    else if (chosenXAxis === "agri_employment"){
      xlabel = "Employment in Agriculture";
    }
    
    else if (chosenXAxis === 'child_mortality_rates'){
      xlabel = 'Child Mortality Rates'
    }

    else if (chosenXAxis === 'obesity_rates'){
      xlabel = 'Obesity Rates'
    } // Note, when adding a long label such as "US State Prison Population, the label will not appear when the mouse hovers over the data point"
    
    else if (chosenXAxis === 'hivdeaths'){
      xlabel = 'HIV Deaths'
    }
    
    else {
      xlabel = "Life Expectency";
    }
  
    if (chosenYAxis === "cash_crop_kg_ha") {
      ylabel = "Cash Crops";
    } 
    else if (chosenYAxis === "gdp"){
      
      ylabel = "Gross Domestic Product";
    }
    
    else if (chosenYAxis === 'mental_health'){

      ylabel = 'Mental Health'
    }

    else if (chosenYAxis === 'hiv_cases'){
      ylabel = 'HIV Cases'
    }
    
    else {
      ylabel = "Population";
    }
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([100, -85])
      .html(function(d) {

        return (`<h5>${d.country}</h5><hr><h5>${xlabel}</h5>${d[chosenXAxis]}<h5>${ylabel}</h5>${d[chosenYAxis]}`)


      });
  
    groupedCircles.call(toolTip);
  
   // Event Change when mouse hovers over the data point
    groupedCircles.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
      
      .on("mouseout", function(data) {
          toolTip.hide(data, this);
      });
  
  return groupedCircles;
  }
/* Reading into the CSV data to plot the initial values */

d3.json("/worlddata").then(function(worldData){

    console.log(worldData);

    // Filtering for latest data
    let _2018Data = worldData.filter(year => year._date === '1/01/2018');
    console.log(_2018Data);

    //Iterating over the datasets
    _2018Data.forEach(function(data) {
        data.staple_crop_kg_ha = +data.staple_crop_kg_ha;
        data.agri_employment = +data.agri_employment;
        data.child_mortality_rates = +data.child_mortality_rates;
        data.obesity_rates = +data.obesity_rates;
        data.healthcare = +data.healthcare;
        data.hivdeaths = +data.hivdeaths;
        data.life_expectency = +data.life_expectency
        data.cash_crop_kg_ha = +data.cash_crop_kg_ha;
        data.gdp = +data.gdp;
        data.mental_health = +data.mental_health;
        data.hiv_cases = +data.hiv_cases;
        data.population = +data.population;
        
    });

    /* Setting the initial scales for the plot and calling on the previous created xScale 
    and yScale functions */
    
  var xLinearScale = xScale(_2018Data, chosenXAxis); // The original chosenXAxis is poverty
  var yLinearScale = yScale(_2018Data, chosenYAxis); // The original chosenYAxis is healthcare

  

  

  // Setting up the initial axis parameters
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Adding the x and y axis to the chartgroup variable created earlier
  var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
    .attr("class", "axisColour");

  var yAxis = chartGroup.append("g")
    .call(leftAxis)
    .attr("class", "axisColour");
  

  // Creating a scatter plot with the circle shapes
  var groupedCircles = chartGroup.selectAll("g")
    .data(_2018Data)
    .enter()
    .append("g");
  
  var XYCircles = groupedCircles.append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .classed("countryCircle", true);

    // Adding the state abbreviations to the text  
  var CountryAbbrevText = groupedCircles.append("text")
    .text(d => d.abbreviation)
    .attr("dx", d => xLinearScale(d[chosenXAxis]))
    .attr("dy", d => yLinearScale(d[chosenYAxis]) + 5)
    .classed("countryText", true);

    // Creating two groups of three x and y axis labels so that user can toggle between the six
  var groupedXLabels = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height})`);

  // Selected groups in the x-axis are poverty, income and age  
  var stapleCropLabel = groupedXLabels.append("text")
    .attr("x", -150)
    .attr("y", 40)
    .attr("value", "staple_crop_kg_ha") // <-- This will obtain the value relating to poverty rates
    .text("Staple Crops")
    .classed("active", true);

  var agriEmpLabel = groupedXLabels.append("text")
    .attr("x", 150)
    .attr("y", 40)
    .attr("value", "agri_employment") // <-- This will obtain the value relating to age
    .text("Employment in Agriculture")
    .classed("inactive", true);

  var childMortalityLabel = groupedXLabels.append("text")
    .attr("x", -150)
    .attr("y", 60)
    .attr("value", "child_mortality_rates") // <-- This will obtain the value relating to income 
    .text("Child Mortality Rates")
    .classed("inactive", true);
  
    var obesityLabel = groupedXLabels.append("text")
    .attr("x", 150)
    .attr("y", 60)
    .attr("value", "obesity_rates") // <-- This will obtain the value relating to state gdp 
    .text("Obesity Rates")
    .classed("inactive", true);

    var hivDeathsLabel = groupedXLabels.append("text")
    .attr("x", -150)
    .attr("y", 80)
    .attr("value", "hivdeaths") // <-- This will obtain the value relating to prisoner
    .text("HIV Deaths")
    .classed("inactive", true);

    var lifeExpectencyLabel = groupedXLabels.append("text")
    .attr("x", 150)
    .attr("y", 80)
    .attr("value", "life_expectency") // <-- This will obtain the value relating to prisoner
    .text("Life Expectency")
    .classed("inactive", true);

// Selected Groups for the y-axis are healthcare, obesity and smoking
  var groupedYLabels = chartGroup.append("g");

  var cashCropsLabel = groupedYLabels.append("text")
    .attr("transform", "rotate(-90)")// This will rotate the labels and fit along the y axis
    .attr("x", -(height * 0.75))// The negative sign and dividing by two ensures that the labels are halfway from the top
    .attr("y", -70)
    .attr("value", "cash_crop_kg_ha") // <-- Obtain values relating to healthcare access
    .text("Cash Crop Yield")
    .classed("active", true);

  var gdpLabel = groupedYLabels.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height * 0.25))
    .attr("y", -70)
    .attr("value", "gdp") // <-- Obtain values relating to smoking rates
    .text("Gross Domestic Product")
    .classed("inactive", true);

  var mentalHealthLabel = groupedYLabels.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height * 0.75))
    .attr("y", -90)
    .attr("value", "mental_health") // <-- Obtain values relating to obesity rates
    .text("Mental Health Issues")
    .classed("inactive", true);
  
  var hivcasesLabel = groupedYLabels.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height * 0.25))
    .attr("y", -90)
    .attr("value", "hiv_cases") // <-- This will obtain the value relating to air pollution ranking 
    .text("HIV Cases")
    .classed("inactive", true);

  var populationLabel = groupedYLabels.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height * 0.25))
    .attr("y", -110)
    .attr("value", "population") // <-- This will obtain the value relating to state population 
    .text("Population")
    .classed("inactive", true);

  // Setting up the initial tooltips
  groupedCircles = updateToolTip(groupedCircles, chosenXAxis, chosenYAxis);

  // Event changes in a user clicks on age or income on the x axis from the initial data set for poverty
  groupedXLabels.selectAll("text").on("click", function() 
  {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {

      // This will replace the original value of poverty
      chosenXAxis = value;

      // Now all the functions will be called to replace the original set of data
      xLinearScale = xScale(_2018Data, chosenXAxis);

      xAxis = renderXAxes(xLinearScale, xAxis);

      XYCircles = renderXCircles(XYCircles, xLinearScale, chosenXAxis);

      CountryAbbrevText = renderXText(CountryAbbrevText, xLinearScale, chosenXAxis);

      groupedCircles = updateToolTip(groupedCircles, chosenXAxis, chosenYAxis);

      if (chosenXAxis === "staple_crop_kg_ha") {
        stapleCropLabel
          .classed("active", true)
          .classed("inactive", false);
        agriEmpLabel
          .classed("active", false)
          .classed("inactive", true);
        childMortalityLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        hivDeathsLabel
          .classed("active", false)
          .classed("inactive", true);
        lifeExpectencyLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenXAxis === "agri_employment") {
        stapleCropLabel
          .classed("active", false)
          .classed("inactive", true);
        agriEmpLabel
          .classed("active", true)
          .classed("inactive", false);
        childMortalityLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        hivDeathsLabel
          .classed("active", false)
          .classed("inactive", true);
        lifeExpectencyLabel
          .classed("active", false)
          .classed("inactive", true);
          
      }
      else if (chosenXAxis === "child_mortality_rates") {
        stapleCropLabel
          .classed("active", false)
          .classed("inactive", true);
        agriEmpLabel
          .classed("active", false)
          .classed("inactive", true);
        childMortalityLabel
          .classed("active", true)
          .classed("inactive", false);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        hivDeathsLabel
          .classed("active", false)
          .classed("inactive", true);
        lifeExpectencyLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenXAxis === "obesity_rates") {
        stapleCropLabel
          .classed("active", false)
          .classed("inactive", true);
        agriEmpLabel
          .classed("active", false)
          .classed("inactive", true);
        childMortalityLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", true)
          .classed("inactive", false);
        hivDeathsLabel
          .classed("active", false)
          .classed("inactive", true);
        lifeExpectencyLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenXAxis === "hivdeaths") {
        stapleCropLabel
          .classed("active", false)
          .classed("inactive", true);
        agriEmpLabel
          .classed("active", false)
          .classed("inactive", true);
        childMortalityLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        hivDeathsLabel
          .classed("active", true)
          .classed("inactive", false);
        lifeExpectencyLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
        stapleCropLabel
          .classed("active", false)
          .classed("inactive", true);
        agriEmpLabel
          .classed("active", false)
          .classed("inactive", true);
        childMortalityLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        hivDeathsLabel
          .classed("active", false)
          .classed("inactive", true);
        lifeExpectencyLabel
          .classed("active", true)
          .classed("inactive", false);
      }
    }
  });

  // The same principles apply for changes in the y axis as coded for the x axis
  groupedYLabels.selectAll("text").on("click", function() 
  {
    
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // Retreives the new value that replaces the original healthcare variable as seen when the page loads
      chosenYAxis = value;

      // Now all the functions will be called to replace the original set of data
      yLinearScale = yScale(worldData, chosenYAxis);

      yAxis = renderYAxes(yLinearScale, yAxis);

      XYCircles = renderYCircles(XYCircles, yLinearScale, chosenYAxis);

      CountryAbbrevText = renderYText(CountryAbbrevText, yLinearScale, chosenYAxis);

      groupedCircles = updateToolTip(groupedCircles, chosenXAxis, chosenYAxis);

      if (chosenYAxis === "cash_crop_kg_ha") {
        cashCropsLabel
          .classed("active", true)
          .classed("inactive", false);
        gdpLabel
          .classed("active", false)
          .classed("inactive", true);
        mentalHealthLabel
          .classed("active", false)
          .classed("inactive", true);
        hivcasesLabel
          .classed("active", false)
          .classed("inactive", true);
        populationLabel
          .classed("active", false)
          .classed("inactive", true);        
      }
      else if (chosenYAxis === "gdp"){
        cashCropsLabel
          .classed("active", false)
          .classed("inactive", true);
        gdpLabel
          .classed("active", true)
          .classed("inactive", false);
        mentalHealthLabel
          .classed("active", false)
          .classed("inactive", true);
        hivcasesLabel
          .classed("active", false)
          .classed("inactive", true);
        populationLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenYAxis === "mental_health"){
        cashCropsLabel
          .classed("active", false)
          .classed("inactive", true);
        gdpLabel
          .classed("active", false)
          .classed("inactive", true);
        mentalHealthLabel
          .classed("active", true)
          .classed("inactive", false);
        hivcasesLabel
          .classed("active", false)
          .classed("inactive", true);
        populationLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenYAxis === "hiv_cases"){
        cashCropsLabel
          .classed("active", false)
          .classed("inactive", true);
        gdpLabel
          .classed("active", false)
          .classed("inactive", true);
        mentalHealthLabel
          .classed("active", false)
          .classed("inactive", true);
        hivcasesLabel
          .classed("active", true)
          .classed("inactive", false);
        populationLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
        cashCropsLabel
          .classed("active", false)
          .classed("inactive", true);
        gdpLabel
          .classed("active", false)
          .classed("inactive", true);
        mentalHealthLabel
          .classed("active", false)
          .classed("inactive", true);
        hivcasesLabel
          .classed("active", false)
          .classed("inactive", true);
        populationLabel
          .classed("active", true)
          .classed("inactive", false);
      }
    }
  });

})
