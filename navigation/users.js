const Users = {
    "admin":{
        name: "admin",
        permissions: [
            "control:users",
            "control:products",
            "control:qrcodes",
            "control:scanning",
            "control:blocks",
            "control:settings"
        ]
    },
    "manufacturer":{
        name: "manufacturer",
        permissions: [
            "control:users",
            "control:products",
            "control:qrcodes",
            "control:scanning",
            "control:settings"
        ]
    },
    "distributor":{
        name: "distributor",
        permissions: [
            "control:users",
            "control:scanning",
            "control:settings",
        ]
    },
    "retailer":{
        name: "retailer",
        permissions: [
            "control:users",
            "control:scanning",
            "control:settings",
        ]
    },
    "end-user":{
        name: "end-user",
        permissions: [
            "control:users",
            "control:scanning",
            "control:settings",
        ]
    }
}