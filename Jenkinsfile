pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "chamodibandara/bookmark-frontend:latest"
        DOCKER_IMAGE_BACKEND  = "chamodibandara/bookmark-backend:latest"
        DOCKER_CREDENTIALS_ID = "dockerhub"   // DockerHub credentials ID in Jenkins
        GIT_REPO              = "https://github.com/ChamodiBandara/BookMark-Devops-Project.git"
        EC2_SSH_CRED_ID        = "ec2-ssh"     // EC2 SSH key credential ID in Jenkins
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
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                sh "docker push ${DOCKER_IMAGE_BACKEND}"
            }
        }

        stage('Deploy to EC2 (Ansible)') {
            steps {
                sshagent(credentials: ["${EC2_SSH_CRED_ID}"]) {
                    sh '''
                        set -e
                        cd deploy/ansible
                        ansible-playbook -i inventory.ini deploy.yml
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
