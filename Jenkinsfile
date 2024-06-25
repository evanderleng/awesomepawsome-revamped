pipeline {
    agent any
    stages {
        stage('Dependency Check') {
            steps {
                dependencyCheck additionalArguments: ''' 
                            --format HTML --format XML
                            ''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
    }
}
