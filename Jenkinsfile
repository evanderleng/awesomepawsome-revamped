pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Build') { 
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Dependency Check') {
            steps {
                dependencyCheck additionalArguments: ''' 
                            --format HTML --format XML
                            ''', odcInstallation: 'Dependency Check'
                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
        stage('Testing Phase') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
    }
}
