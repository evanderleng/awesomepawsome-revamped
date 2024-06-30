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
        //Temp disable it, testing other tusff. This take few min to process
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

        /*stage('Build Backend') {
            steps {
                dir('backend') {
                    // Install npm dependencies
                    sh 'npm install'

                    // Start the backend server
                    sh 'npm start'
                }
            }
        }*/

        stage('Deploy Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                    sh 'cp -r ./* /var/www/awesomepawsome'
                }
            }
        }
    }

     post {
        always {
            cleanWs()
        }
    }
}
