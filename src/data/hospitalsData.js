const hospitalsData = {
    "hospitals": [
        {
            "id": 1,
            "name": "Hospital A",
            "position": {
                "latitude": 48.8566,
                "longitude": 2.3522
            },
            "address": "123 Main Street, Paris, France",
            "specialties": ["cardiology", "orthopedics", "neurology"],
            "public": true,
            "currentWaitTime": 15,
            "travelTime": 10,
        },
        {
            "id": 2,
            "name": "Hospital B",
            "position": {
                "latitude": 48.8648,
                "longitude": 2.3499
            },
            "address": "456 Another Street, Paris, France",
            "specialties": ["pediatrics", "general surgery"],
            "public": false,
            "currentWaitTime": 20,
            "travelTime": 5,
        },
        {
            "id": 3,
            "name": "Hospital C",
            "position": {
                "latitude": 48.8584,
                "longitude": 2.2945
            },
            "address": "1 Eiffel Tower Street, Paris, France",
            "specialties": ["trauma", "cardiology"],
            "public": true,
            "currentWaitTime": 12,
            "travelTime": 8
        },
        {   
            "id": 4,
            "name": "Hospital D",
            "position": {
                "latitude": 48.8500,
                "longitude": 2.2982
            },
            "address": "10 Rue de Grenelle, Paris, France",
            "specialties": ["neurology", "orthopedics"],
            "public": false,
            "currentWaitTime": 30,
            "travelTime": 15
        },
        {
            "id": 5,
            "name": "Hospital E",
            "position": {
                "latitude": 48.8561,
                "longitude": 2.2939
            },
            "address": "20 Avenue de Suffren, Paris, France",
            "specialties": ["general surgery", "pediatrics"],
            "public": true,
            "currentWaitTime": 10,
            "travelTime": 5
        },
        {   
            "id": 6,
            "name": "Hospital F",
            "position": {
                "latitude": 48.8575,
                "longitude": 2.3477
            },
            "address": "30 Rue du Temple, Paris, France",
            "specialties": ["dermatology", "urology"],
            "public": false,
            "currentWaitTime": 25,
            "travelTime": 18
        },
        {
            "id": 7,
            "name": "Hospital G",
            "position": {
                "latitude": 48.8605,
                "longitude": 2.3524
            },
            "address": "40 Rue Saint-Denis, Paris, France",
            "specialties": ["neurology", "pediatrics"],
            "public": true,
            "currentWaitTime": 18,
            "travelTime": 12
        },
        {
            "id": 8,
            "name": "Hospital H",
            "position": {
                "latitude": 48.8550,
                "longitude": 2.3542
            },
            "address": "50 Boulevard de Sébastopol, Paris, France",
            "specialties": ["cardiology", "orthopedics"],
            "public": false,
            "currentWaitTime": 22,
            "travelTime": 20
        },
        {
            "id": 9,
            "name": "Hospital I",
            "position": {
                "latitude": 48.8532,
                "longitude": 2.3488
            },
            "address": "60 Rue de Rivoli, Paris, France",
            "specialties": ["trauma", "neurology"],
            "public": true,
            "currentWaitTime": 15,
            "travelTime": 10
        },
        {
            "id": 10,
            "name": "Hospital J",
            "position": {
                "latitude": 48.8625,
                "longitude": 2.3332
            },
            "address": "70 Avenue des Champs-Élysées, Paris, France",
            "specialties": ["orthopedics", "dermatology"],
            "public": false,
            "currentWaitTime": 28,
            "travelTime": 12
        },
        {
            "id": 11,
            "name": "Hospital K",
            "position": {
                "latitude": 48.8698,
                "longitude": 2.3360
            },
            "address": "80 Rue de la Paix, Paris, France",
            "specialties": ["general surgery", "cardiology"],
            "public": true,
            "currentWaitTime": 16,
            "travelTime": 9
        },
        {
            "id": 12,
            "name": "Hospital L",
            "position": {
                "latitude": 48.8714,
                "longitude": 2.3549
            },
            "address": "90 Rue du Faubourg Saint-Honoré, Paris, France",
            "specialties": ["pediatrics", "urology"],
            "public": false,
            "currentWaitTime": 20,
            "travelTime": 7
        },
        {
            "id": 13,
            "name": "Hospital M",
            "position": {
                "latitude": 48.8761,
                "longitude": 2.3433
            },
            "address": "100 Boulevard de Clichy, Paris, France",
            "specialties": ["neurology", "trauma"],
            "public": true,
            "currentWaitTime": 14,
            "travelTime": 11
        },
        {
            "id": 14,
            "name": "Hospital N",
            "position": {
                "latitude": 48.8567,
                "longitude": 2.3455
            },
            "address": "110 Rue de la Chapelle, Paris, France",
            "specialties": ["cardiology", "orthopedics"],
            "public": false,
            "currentWaitTime": 32,
            "travelTime": 14
        },
        {
            "id": 15,
            "name": "Hospital O",
            "position": {
                "latitude": 48.8540,
                "longitude": 2.3291
            },
            "address": "120 Rue de Vaugirard, Paris, France",
            "specialties": ["pediatrics", "dermatology"],
            "public": true,
            "currentWaitTime": 19,
            "travelTime": 16
        },
        {
            "id": 16,
            "name": "Hospital P",
            "position": {
                "latitude": 48.8521,
                "longitude": 2.3685
            },
            "address": "130 Rue du Faubourg Saint-Antoine, Paris, France",
            "specialties": ["general surgery", "cardiology"],
            "public": false,
            "currentWaitTime": 25,
            "travelTime": 10
        },
        {
            "id": 17,
            "name": "Hospital Q",
            "position": {
                "latitude": 48.8692,
                "longitude": 2.3342
            },
            "address": "140 Avenue de l'Opéra, Paris, France",
            "specialties": ["neurology", "orthopedics"],
            "public": true,
            "currentWaitTime": 13,
            "travelTime": 6
        },
        {
            "id": 18,
            "name": "Hospital R",
            "position": {
                "latitude": 48.8708,
                "longitude": 2.3314
            },
            "address": "150 Boulevard Montmartre, Paris, France",
            "specialties": ["trauma", "urology"],
            "public": false,
            "currentWaitTime": 21,
            "travelTime": 8
        }
    ]
}

// const hospitalsData = {
//     "hospitals": [
//         {
//             "id": 1,
//             "name": "Hospital A",
//             "position": {
//                 "latitude": 48.8566,
//                 "longitude": 2.3522
//             },
//             "address": "123 Main Street, Paris, France",
//             "specialties": ["cardiology", "orthopedics", "neurology"],
//             "public": true,
//             "currentWaitTime": 15,
//             "travelTime": 10,
//         },
//         {
//             "id": 2,
//             "name": "Hospital B",
//             "position": {
//                 "latitude": 48.8648,
//                 "longitude": 2.3499
//             },
//             "address": "456 Another Street, Paris, France",
//             "specialties": ["pediatrics", "general surgery"],
//             "public": false,
//             "currentWaitTime": 20,
//             "travelTime": 5,
//         },
//         {
//             "id": 3,
//             "name": "Hospital C",
//             "position": {
//                 "latitude": 48.8584,
//                 "longitude": 2.2945
//             },
//             "address": "1 Eiffel Tower Street, Paris, France",
//             "specialties": ["trauma", "cardiology"],
//             "public": true,
//             "currentWaitTime": 12,
//             "travelTime": 8
//         },
//     ],
// }

export default hospitalsData;