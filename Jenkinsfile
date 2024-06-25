pipeline {
    agent any
    stages {
        stage('Dependency Check') {
            steps {
                dependencyCheck additionalArguments: ''' 
                            --format HTML --format XML
                            ''', odcInstallation: 'Dependency Check'
                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
    }
}
