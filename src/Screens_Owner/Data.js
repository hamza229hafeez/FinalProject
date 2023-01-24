function CityList() {
    return [
        {
            label: "Rawalpindi",
            value: "Rawalpindi",
        },
        {
            label: "Islamabad",
            value: "Islamabad",
        },
        {
            label: "karachi",
            value: "Karachi",
        },
        {
            label: "Lahore",
            value: "Lahore",
        },
        {
            label: "Faisalabad",
            value: "Faisalabad",
        },
        {
            label: "Gujranwala",
            value: "Gujranwala",
        },
        {
            label: "Peshawar",
            value: "Peshawar",
        },
        {
            label: "Multan",
            value: "Multan",
        },
        {
            label: "Hyderabad",
            value: "Hyderabad",
        },
        {
            label: "Quetta",
            value: "Quetta",
        },
    ]
}
function SubAreaList(con) {
    switch (con) {
        case 'Karachi':
            return [
                {
                    label: "Gulshan-e-Iqbal",
                    value: "Gulshan-e-Iqbal",
                },
                {
                    label: "Gulistan-e-Johar",
                    value: "Gulistan-e-Johar",
                },
                {
                    label: "DHA",
                    value: "DHA",
                },
                {
                    label: "Bahria town",
                    value: "Bahria town",
                },
                {
                    label: "North Nazimabad",
                    value: "North Nazimabad",
                }
            ]
        case 'Lahore':
            return [
                {
                    label: "DHA",
                    value: "DHA",
                },
                {
                    label: "Bahria Town",
                    value: "Bahria Town",
                },
                {
                    label: "Gulberg",
                    value: "Gulberg",
                },
                {
                    label: "Johar Town",
                    value: "Johar Town",
                },
                {
                    label: "Garden Town",
                    value: "Garden Town",
                }
            ]
        case 'Faisalabad':
            return [
                {
                    label: "WAPDA City",
                    value: "WAPDA City",
                },
                {
                    label: "Peoples Colony",
                    value: "Peoples Colony",
                },
                {
                    label: "Jinnah Colony",
                    value: "Jinnah Colony",
                },
                {
                    label: "Abdullah Garden",
                    value: "Abdullah Garden",
                },
                {
                    label: "Model City",
                    value: "Model City",
                }
            ]
        case 'Rawalpindi':
            return [
                {
                    label: "Satellite Town",
                    value: "Satellite Town",
                },
                {
                    label: "Raja Bazar",
                    value: "Raja Bazar",
                },
                {
                    label: "Capital Smart City",
                    value: "Capital Smart City",
                },
                {
                    label: "Bahria Town",
                    value: "Bahria Town",
                },
                {
                    label: "Saddar",
                    value: "Saddar",
                }
            ]
        case 'Gujranwala':
            return [
                {

                    label: "WAPDA town Gurjranwala",
                    value: "WAPDA town Gurjranwala",
                },
                {
                    label: "DHA Gujranwala",
                    value: "DHA Gujranwala",
                },
                {
                    label: "Citi Housing Gujranwala",
                    value: "Citi Housing Gujranwala",
                },
                {
                    label: "Royal Palm City Gujranwala",
                    value: "Royal Palm City Gujranwala",
                },
                {
                    label: "University Town Gujranwala",
                    value: "University Town Gujranwala",
                }
            ]
        case 'Peshawar':
            return [
                {
                    label: "Satellite Town",
                    value: "Satellite Town",
                },
                {
                    label: "Raja Bazar",
                    value: "Raja Bazar",
                },
                {
                    label: "Capital Smart City",
                    value: "Capital Smart City",
                },
                {
                    label: "Bahria Town",
                    value: "Bahria Town",
                },
                {
                    label: "Saddar",
                    value: "Saddar",
                }
            ]
        case 'Multan':
            return [

                {
                    label: "DHA Defence",
                    value: "DHA Defence",
                },
                {
                    label: "Royal Orchard",
                    value: "Royal Orchard",
                },
                {
                    label: "MA Jinnah Road",
                    value: "MA Jinnah Road",
                },
                {
                    label: "Wapda Town Phase 1",
                    value: "Wapda Town Phase 1",
                },
                {
                    label: " Northern Bypass",
                    value: "Northern Bypass",
                }
            ]
        case 'Hyderabad':
            return [

                {
                    label: "Latifabad",
                    value: "Latifabad",
                },
                {
                    label: " Qasimabad",
                    value: " Qasimabad",
                },
                {
                    label: " Hyderabad Bypass",
                    value: " Hyderabad Bypass",
                },
                {
                    label: "Kohsar Housing Society",
                    value: "Kohsar Housing Society",
                },
                {
                    label: " Isra Village",
                    value: " Isra Village",
                }
            ]
        case 'Islamabad':
            return [

                {
                    label: "Bahria Town",
                    value: "Bahria Town",
                },
                {
                    label: "Top city",
                    value: "Top city",
                },
                {
                    label: "Gulberg Greens",
                    value: "Gulberg Greens",
                },
                {
                    label: "Green Oaks",
                    value: "Green Oaks",
                },
                {
                    label: "F10",
                    value: "F10",
                }
            ]
        case 'Quetta':
            return [

                {
                    label: "Samungli road",
                    value: "Samungli road",
                },
                {
                    label: "Jinnah town ",
                    value: "Jinnah town ",
                },
                {
                    label: "Chilten housing scheme",
                    value: "Chilten housing scheme",
                },
                {
                    label: "Samungli road",
                    value: "Samungli road",
                },
                {
                    label: "Nawai Killi Bhittani",
                    value: "Nawai Killi Bhittani",
                }
            ]

    }



}
function cordinatesofcity(city) {
    switch (city) {
        case 'Karachi':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Lahore':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Faisalabad':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Rawalpindi':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Gujranwala':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Peshawar':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Multan':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Hyderabad':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Islamabad':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
        case 'Quetta':
            return {
                latitude: 33.5651,
                longitude: 73.0169,
                latitudeDelta: .05,
                longitudeDelta: .05,
            }
    }



}
export { CityList, SubAreaList ,cordinatesofcity}