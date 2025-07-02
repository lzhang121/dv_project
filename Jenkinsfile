pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('887ec198-353d-4c00-ade8-2b5d41c69ede') // Jenkins 中配置的凭证 ID
        DOCKERHUB_USER = 'rayzhang11'
        IMAGE_FRONTEND = "${DOCKERHUB_USER}/vfrontend"
        IMAGE_BACKEND = "${DOCKERHUB_USER}/dbackend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('vfrontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('dbackend') {
                    sh 'pip install -r requirements.txt'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_FRONTEND ./vfrontend'
                    sh 'docker build -t $IMAGE_BACKEND ./dbackend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USER --password-stdin"
                    sh 'docker push $IMAGE_FRONTEND'
                    sh 'docker push $IMAGE_BACKEND'
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
