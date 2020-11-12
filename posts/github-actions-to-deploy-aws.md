---
title: How to use Github Actions to deploy Next.js app to AWS S3
slug: how-to-use-github-actions-to-deploy-nextjs-app-to-aws-s3
date: November 9, 2020
category: Nextjs
---

GitHub Actions makes it easy to automate all your software workflows. You can build, test, and deploy your code right from GitHub. In a previous article we created a **Next.js** application and we deployed it to **AWS S3**, but every time the code is changed we have to restart the build, go back to the aws console, and download our new build files.

In this article, we'll see how to automate this with **Github Actions** so that every new code is pushed to the main branch of the app built and deployed to aws.

This is the process I use for this blog 😊

## Table of contents

**for this tutorial you must have a next.js application deployed on aws and a Github Account, [I wrote an article about it](../how-to-deploy-static-nextjs-to-aws-s3)**

- Create repository for our **Next.js** app, and push on **Github**
- Create **Github Actions**
- Publish new version of our **Next.js** app on **AWS S3** with **Github Actions**

## Create repository for our Next.js app, and push on Github

First, we will create our repository which will host your code, then we'll push that code. Let's go, create a new repository on **Github** and name it whatever you want :

![createRepo](https://user-images.githubusercontent.com/13301795/98921076-2a37d900-24d1-11eb-9c44-2f623636eb88.png)

Now as shown in the quick setup we are going to rename the branch master in main, add the remote origin for **Github** and finally push our code

![quickSetupGithub](https://user-images.githubusercontent.com/13301795/98921061-26a45200-24d1-11eb-90b2-86480c477f65.png)

In **Next.js** app git is already init, so we need to rename the `master` branch in `main`, on app folder:

```shell
git branch -M main
```

Add **Github** to origin remote:

```shell
git remote add origin git@github.com:<YourRepository>
# (e.g : git@github.com:ParmentierChristophe/my-awesome-nextjs-app.git)
```

And finally push the code to **Github**:

```shell
git push -u origin main
```

Refresh your repository page and you should see your code on **Github**

![githubRepo](https://user-images.githubusercontent.com/13301795/98923359-d7135580-24d3-11eb-849f-62625d0aa014.png)

In the next chapter, we will create our Github actions.🎉

## Create Github Actions

**Github** actions tool is quite simple to set up but can be scary at first. start by taking a quick tour of this feature's page to learn a little more. There is a multitude of utility for **Github actions**, here we will use it to build a **Next.js** application and deploy it on **AWS**

### create secret keys for github and aws access

You need secret configuration keys linked to your **Github** repository which will allow the aws job to identify you and accept deployment to your bucket. To do that let's go to the aws console, click on your Username> **My Security Credentials**:
![security aws](https://user-images.githubusercontent.com/13301795/98930546-185c3300-24dd-11eb-92cd-7543a7fe481a.png)

In Access keys (access key ID and secret key), choose create access key, as indicate :

**Download your key file now, which contains your new access key ID and secret access key. If you do not download the key file now, you will not be able to retrieve your secret access key again.**

I have already deleted these keys and it is **important** to never expose your keys

![keys](https://user-images.githubusercontent.com/13301795/98930536-14c8ac00-24dd-11eb-8c52-6f1e72ab3e54.png)

now that you have your keys let's go back to **Github** in the tab **Settings** > **Secrets** and **new repository secret**

![accessKey](https://user-images.githubusercontent.com/13301795/98931662-9b31bd80-24de-11eb-87ca-030e4067b04a.png)

add your `AWS_ACCESS_KEY_ID` and your `AWS_SECRET_ACCESS_KEY` (the name must be exactly as in your script):
![secretkey](https://user-images.githubusercontent.com/13301795/98931659-9a992700-24de-11eb-9233-7add143ce935.png)
![keysongithub](https://user-images.githubusercontent.com/13301795/98931654-979e3680-24de-11eb-8238-d7c4c7cee525.png)

now that the configuration is complete, let's create the script.

### Create script

In your **Repository** > **Actions** select **set up a workflow yourself**:
![actions](https://user-images.githubusercontent.com/13301795/98926135-31fa7c00-24d7-11eb-8091-41af22327a4c.png)

You arrive on a new page to create the desired action script, let's start by renaming the file to `deploy.yml` as we are going to create a deployment script.

![script](https://user-images.githubusercontent.com/13301795/98926128-2e66f500-24d7-11eb-8edb-60b427b36dab.png)

the path of this script will be `repository-name/.github/workflows/deploy.yml`, you can therefore create as many as you want and modify them directly from your text editor. but for now let's create our deployment script, delete script content and add this:

```yml
name: Deploy

# Controls when the action will run. Triggers the workflow on push
# events but only for the main branch
on:
  push:
    branches: [main]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      # set up node v12 for use commands (npm install)
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      # install yarn globally
      - run: npm install -g yarn
      # install dependencies
      - run: yarn install --frozen-lockfile
      # use build script coming from  package.json: next build && next export
      - run: yarn build
      # use aws job configure-aws-credentials: https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions
      - uses: aws-actions/configure-aws-credentials@v1
        # configuration for aws-actions
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      # Copy files to the production website with the AWS CLI
      - name: Copy files to the production website with the AWS CLIs
        # change with your bucket name !!
        run: aws s3 sync ./out s3://<YOUR-BUCKET-NAME>
```

I detailed each line of the script, now let's see what the configuration for aws-actions is : `${{ secrets.AWS_ACCESS_KEY_ID }}`, `${{ secrets.AWS_SECRET_ACCESS_KEY }}`, `aws-region`. for the latter it is the region where your S3 bucket. Mine is `us-east-1`.

`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are the keys that we added as a secret key to our repository.

**Don't forget to change this part by the name of your bucket**

```yml
# EXAMPLE
        run: aws s3 sync ./out s3://<YOUR-BUCKET-NAME>
        # to
        run: aws s3 sync ./out s3://my-awesome-nextjs-app
```

Click on **start commit** > **Commit new file** for commit your deployment script, your deployment script will launch if you decide to push on the `main` branch:

![deploy](https://user-images.githubusercontent.com/13301795/98932716-fca65c00-24df-11eb-9eef-32ec1425bafa.png)

Our deployment script is done 😎! Let's see if everything works.

## Publish new version of our Next.js app on AWS S3 with Github Actions

Finally, let's see if the deployment script works correctly and if the link between the aws job and aws also works.

In our application let's make a small modification in the file `pages/index.js`, let's change the `h1`:

```html
<h1 className="{styles.title}">Welcome to <a href="https://nextjs.org">Next.js!</a></h1>
<!-- to -->
<h1 className="{styles.title}">Welcome to my awesome Next.js application !</h1>
```

Add and commit this change

```shell
git add .
```

```shell
git commit -m 'change the title'
```

and push to **Github** :

```shell
git push origin main
```

as we have just pushed on the `main` branch, the deployment script has just started, go to your **Github** repository > **Actions** to see if everything is going well, when the job is successfully finished let's go see the address of our bucket to see if the changes have been made.

![awsupload](https://user-images.githubusercontent.com/13301795/98945060-45ffa700-24f2-11eb-82fd-8871f264ad16.png)

🎉 We just set up a deployment job for a **Next.js** application on **AWS s3** 🎉

## Conclusion

**Github** actions require a bit of configuration but once configured it will save you precious time, thanks to this, no more builds and deployments by hand !

Tell me if you use Gtihub Actions and how ! I look forward to hearing your answers
Thank you for following this article, do not hesitate to give me your feedback and if you liked it share it and follow me on [Twitter](https://twitter.com/theCrispydesign)
