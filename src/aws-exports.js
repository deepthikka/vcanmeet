/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-2",
    "aws_cognito_identity_pool_id": "us-east-2:c4b08300-12b9-4e3b-96b9-94b3b10e4641",
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": "us-east-2_dEMqBcRSt",
    "aws_user_pools_web_client_id": "2t4jbspmlu2b8vk9a8mm4si0mq",
    "oauth": {
        "domain": "vcanmeetapp-staging.auth.us-east-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://www.uat.vcanmeet.com/profile/",
        "redirectSignOut": "https://www.uat.vcanmeet.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_login_mechanisms": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_dynamodb_all_tables_region": "us-east-2",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "Master-Category",
            "region": "us-east-2"
        },
        {
            "tableName": "user",
            "region": "us-east-2"
        }
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "category",
            "endpoint": "https://z59bi5ofa1.execute-api.us-east-2.amazonaws.com/staging",
            "region": "us-east-2"
        },
        {
            "name": "user",
            "endpoint": "https://90fmckuqee.execute-api.us-east-2.amazonaws.com/staging",
            "region": "us-east-2"
        }
    ]
};


export default awsmobile;
