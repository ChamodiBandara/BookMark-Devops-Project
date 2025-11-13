pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "chamodibandara/bookmark-frontend:latest"
        DOCKER_IMAGE_BACKEND  = "chamodibandara/bookmark-backend:latest"
        DOCKER_CREDENTIALS    = "docker-hub"
        GIT_REPO              = "https://github.com/ChamodiBandara/BookMark-Devops-Project.git"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_FRONTEND} ./frontend"
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_BACKEND} ./backend"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                sh "docker push ${DOCKER_IMAGE_BACKEND}"
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
