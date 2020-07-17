const Users = {
    "admin":{
        name: "admin",
        permissions: [
            "users",
            "products",
            "qrcodes",
            "scanning",
            "blocks",
            "settings"
        ]
    },
    "manufacturer":{
        name: "manufacturer",
        permissions: [
            "users",
            "products",
            "qrcodes",
            "scanning",
            "settings"
        ]
    },
    "distributor":{
        name: "distributor",
        permissions: [
            "users",
            "scanning",
            "settings",
        ]
    },
    "retailer":{
        name: "retailer",
        permissions: [
            "users",
            "scanning",
            "settings",
        ]
    },
    "end-user":{
        name: "end-user",
        permissions: [
            "users",
            "scanning",
            "settings",
        ]
    },
    "other":{
        name:"other",
        permissions: [
            "users" 
        ]
    }
}

export default Users;