pipeline {
    agent {
        docker {
            image 'docker:20.10.16' // Jenkins agent 容器需要能运行 docker 命令
            args '-v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
    }

    environment {
        DOCKER_COMPOSE_VERSION = 'v2.38.1'  // 确保 docker-compose 可用

    }

    stages {
        stage('Set Display Name') {
            steps {
                script {
                    currentBuild.displayName = "DV-PROJECT-${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Clone Source') {
            steps {
                checkout scm
            }
        }

        stage('Install docker-compose') {
            steps {
                sh '''
                apk add --no-cache curl
                curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
                chmod +x /usr/local/bin/docker-compose
                docker-compose version
                '''
            }
        }

        stage('Build and Start Services') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            sh 'docker-compose down || true' // 确保容器在任何情况下都能停止
        }
    }
}
