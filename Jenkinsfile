pipeline {
    agent any
    environment {
        IMAGE_NAME = "frontend-zma"
        SERVER_DIR = "/opt/zmp/admin-zma"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker build -t docker.io/$DOCKER_USER/${IMAGE_NAME}:latest ."
                }
            }
        }
        stage('Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push docker.io/$DOCKER_USER/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        mkdir -p ${SERVER_DIR}
                        cp docker-compose.yml ${SERVER_DIR}/docker-compose.yml
                        cd ${SERVER_DIR}
                        echo "$DOCKER_PASS" | docker login -u $DOCKER_USER --password-stdin
                        docker compose pull frontend
                        docker compose up -d frontend --remove-orphans
                        docker image prune -f
                    """
                }
            }
        }
    }
}
