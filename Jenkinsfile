pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Unit Testing Phase') {
            steps {
                dir('backend') {
                    sh 'npm install'
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
            steps {
                sh 'docker compose up --build'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
