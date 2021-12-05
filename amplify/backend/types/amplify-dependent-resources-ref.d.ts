export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "vcanmeetapp4cb73148": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "function": {
        "categoryFunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "userFunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "eventFunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "bookingFunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "category": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "user": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "event": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "booking": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}