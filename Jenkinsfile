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
                JWT_TOKEN_SECRET = credentials('jwt-secret')
                PAYPAL_CLIENT_ID = credentials('paypal-client-id')
                PAYPAL_CLIENT_SECRET = credentials('paypal-client-secret')
                CLOUDINARY_CLOUD_NAME = credentials('cloudinary-cloud-name')
                CLOUDINARY_API_KEY = credentials('cloudinary-api-key')
                CLOUDINARY_API_SECRET = credentials('cloudinary-api-secret')
            }
            steps {
                sh 'docker compose up --build -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
