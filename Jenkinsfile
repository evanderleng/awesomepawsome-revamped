pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Dependency Check') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
                dir('backend') {
                    sh 'npm install'
                }
                dependencyCheck additionalArguments: '''
                            --format HTML --format XML -n
                            ''', odcInstallation: 'Dependency Check'

                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
        stage('Unit Testing Phase') {
            steps {
                dir('backend') {
                    sh 'npm run test'
                }
            }
        }
        // Build static files to deploy to frontend server
        stage('Build Phase') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        // Rebuild container images and deploy servers
        stage('Deployment Phase') {
            environment {
                TOKEN_SECRET = credentials('jwt-secret')
                PAYPAL_CLIENT_ID = credentials('paypal-client-id')
                PAYPAL_CLIENT_SECRET = credentials('paypal-client-secret')
                CLOUDINARY_CLOUD_NAME = credentials('cloudinary-cloud-name')
                CLOUDINARY_API_KEY = credentials('cloudinary-api-key')
                CLOUDINARY_API_SECRET = credentials('cloudinary-api-secret')
                GMAIL_USER_EMAIL = credentials('smtp-user-email')
                GMAIL_USER_PW = credentials('smtp-user-pw')
                GMAIL_APP_PW = credentials('smtp-app-pw')
            }
            steps {
                sh 'docker compose down'
                sh 'docker compose up --build -d'
            }
        }
    }

    post {
        always {
            cleanWs()
            //Cleanup docker space
            sh 'docker image prune -f'
            sh 'docker builder prune -f'
        }
    }
}
