const fetchData = (usState, size) => {
    let params = 'id,school.name,latest.student.size,school.school_url,latest.student.demographics.women,latest.completion.6_yr_completion.overall,latest.completion.title_iv.male.completed_by.6yrs,latest.completion.title_iv.female.completed_by.6yrs,school.degrees_awarded.highest'
    return fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?school.state=${usState}&fields=${params}&per_page=100&page=0&api_key=AXpPzlNYnYWUogjB0Pr2hI7tbcHW3E1TLNYLazbn`)
        .then(response => {
            if (!response.ok) {
                throw response
            }
            return response.json()
        })
        .then(data => {return filterData(data.results, size)})
        .catch(err => {return err})
}

const filterData = (initialData, sizes) => {
    let fourYearSchools = filterByDegrees(initialData)
    return filterBySize(fourYearSchools, sizes)
}

const filterByDegrees = (schools) => {
    return schools.filter(school => school['school.degrees_awarded.highest'] > 2)
}

const filterBySize = (schoolsByState, sizes) => {
    let filteredSchools = (!sizes.length) ? schoolsByState : []
    
    let smallSchools = schoolsByState.filter(school => {
        return school['latest.student.size'] < 10000
    })
    let mediumSchools = schoolsByState.filter(school => {
        return school['latest.student.size'] >= 10000 && school['latest.student.size'] <= 20000
    })
    let largeSchools = schoolsByState.filter(school => {
        return school['latest.student.size'] > 20000
    })

    sizes.includes('small') && smallSchools.forEach(school => filteredSchools.push(school))
    sizes.includes('medium') && mediumSchools.forEach(school => filteredSchools.push(school))
    sizes.includes('large') && largeSchools.forEach(school => filteredSchools.push(school))

    return filteredSchools
}

export default fetchData

/*
&id,school.name,latest.student.size,school.school_url,latest.student.demographics.women,latest.completion.6_yr_completion.overall,latest.completion.6_yr_completion.male_students,latest.completion.title_iv.female.completed_by.6yrs
Need: 
- id: ['id']
- name: ['school.name']
- state: 
- enrollment: ['latest.student.size']
- website-url: ['school.school_url']
- %women enrolled: ['latest.student.demographics.women']
- Overall grad rate: ['latest.completion.6_yr_completion.overall']
- Grad rate men: ['latest.completion.title_iv.male.completed_by.6yrs']
- Grad rate women: ['latest.completion.title_iv.female.completed_by.6yrs']
*/

// ***Working url:
// 'https://api.data.gov/ed/collegescorecard/v1/schools.json?school.state=ND&fields=id,school.name&per_page=100&page=0&api_key=AXpPzlNYnYWUogjB0Pr2hI7tbcHW3E1TLNYLazbn'

// Search by: (do all bachelor's schools)
// State, size 

// Size: 
// -- Small: < 10,000 students
// -- Medium: 10-20k Students
// -- Large: > 20k students

// Return:
// Mean earnings 10 yrs after entry, male/female
// % female students: demographics.female_share
// Completion rate for male vs female: completion.male/female.completed_by_4yrs (or 6yrs?)
// Median debt for male vs female students: median_debt.male_students, median_debt.female_students
// Mean earnings 10 years after entry, male vs female: earnings.20_yrs_after_entry.mean_earnings.male_students, ... .female_students
// 

/*
URL Path/API Version - Endpoint - Query String/Filter Params - Field Params - API key
URL Path/API Version: https://api.data.gov/ed/collegescorecard/v1/
Endpoint/dataset: schools.json?
Query/Params: degrees_awarded.predominant=X
Field Params: &
options: &per_page=100&page=0
API key: &api_key=AXpPzlNYnYWUogjB0Pr2hI7tbcHW3E1TLNYLazbn


fields (what I want returned)
latest(or year).dev-category.developer-friendlyname
*school category does not take the latest/year value
*root - no category

dataset = schools
results.latest.school
-- .zip (string)
-- .state (2 letter, string)
-- .school_url (string)
-- price_calculator_url

NDSU id: 200332


*/