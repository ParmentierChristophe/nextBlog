---
title: How to deploy static Next.js to AWS S3
slug: how-to-deploy-static-nextjs-to-aws-s3
date: November 9, 2020
category: Nextjs
---

Next.js this fabulous open source framework based on React allows you to manage an entire application! Both front-end and back-end, perfect for a javascript developer and all this with high performance, but if you arrive on this article, you must surely know it, if not, hop, little link to the [documentation](https://nextjs.org/docs/getting-started)

**Funfact**: This blog is entirely a static site created with [**Next.js**](https://nextjs.org/) 😎

## Table of contents

**For this tutorial Node.js is required.**

- Create **Next.js** app
- Setup **AWS S3 butcket** static website
- Publish **Next.js** Application to **S3 bucket**

## Create Next.js app

As recommended by **Next.js** we will use `create-next-app` for create a project.
There are two possibilities to initialize a project:

```shell
npx create-next-app
# or
yarn create next-app
```

Then follow the instructions and finally go to our project and start it

```shell
cd my-project && yarn dev
```

The server starts up on port `3000`, so let's go to `http://localhost:3000`

![NextApp](https://user-images.githubusercontent.com/13301795/98562391-4d347400-22aa-11eb-8e1e-d9dbec1d37e5.png 'The next app started')

Congratulations 🎉 ! now let's deploy this static **Next.js** application to **aws S3 bucket**

## Setup AWS S3 butcket static website

To continue the tutorial, we are going to move on to the aws console, for this section I am assuming you already have an AWS account with access to the management console.

1. Access your management console
2. on **Find Services**, search **S3**

![S3Service](https://user-images.githubusercontent.com/13301795/98572716-398f0a80-22b6-11eb-847a-8cff5fe5d392.png 'Search S3')

3. click on **Create bucket**

![createBucket](https://user-images.githubusercontent.com/13301795/98572713-37c54700-22b6-11eb-96a2-9a3dd530284e.png 'Create bucket')

4. enter name your Bucket name (e.g: my-awesome-nextjs-app), it must be **unique**

![addname](https://user-images.githubusercontent.com/13301795/98574220-f6359b80-22b7-11eb-9429-a25842f91b90.png 'add bucket name')

5. enable access public and valide by unchecking Block all public access and check the acknowledgment of receipt, you can create the bucket

![accesspublic](https://user-images.githubusercontent.com/13301795/98574198-ed44ca00-22b7-11eb-9c60-acb054784221.png 'enable access public')

6. on list, select your bucket

![selectBucket](https://user-images.githubusercontent.com/13301795/98574186-eae27000-22b7-11eb-8422-b54b7ab7eca9.png 'select bucket on list')

7. go to **properties** > **Static website hosting**, select **Enable** static website hosting and **Host as static website** on **index document** and **Error document** you can ad `index.html`, Save changes

![staticWebsite](https://user-images.githubusercontent.com/13301795/98574156-e3bb6200-22b7-11eb-80eb-4998cc4b9394.png 'static webstite hosting')

8. Now go to **Permissions** > **Bucket policy** edit and add this, **change Ressource with your bucket name**

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[bucket-name]/*"
        }
    ]
}
```

![bucketPolicy](https://user-images.githubusercontent.com/13301795/98574147-e027db00-22b7-11eb-99c2-02b5cc2153a3.png 'bucket policy')

Now you're ready to export the **Next.js** app and add this to yout bucket 🎉

## Publish Next.js Application to S3 bucket

To complete this tutorial, we're going to export our **Next.js** app using `package.json` and import the exported app into our **S3 bucket**.

To start, we will have to modify the file `package.json` to change a build script :

```json
    "build": "next build && next export"
```

This build script build the app and generate all the static files (to folder **out**) necessary to run the application.

![appBuilded](https://user-images.githubusercontent.com/13301795/98650919-dd6dca00-2339-11eb-9327-aef5cd8ce328.png 'builded app')

Go to your **S3 Bucket** and upload the contents of the **out** folder

![UploadS3](https://user-images.githubusercontent.com/13301795/98651281-5705b800-233a-11eb-84f0-266bc64a1e31.png 'upload on S3 bucket')

Click on **Upload**, after loading you can exit

![uploadedFiles](https://user-images.githubusercontent.com/13301795/98651923-2d995c00-233b-11eb-8d2a-b08f69a0e395.png)

To access our application, go to **Properties**> **Static website hosting** where the bucket link is displayed

![linkBucket](https://user-images.githubusercontent.com/13301795/98652228-9b458800-233b-11eb-8f0f-502ac84c3b0f.png)

let's go to this link :

![s3bucket](https://user-images.githubusercontent.com/13301795/98652383-d8117f00-233b-11eb-8d3c-2656abaed775.png)

🎉 **Congratulations** 🎉 We have uploaded our static **Next.js** app to **aws S3 bucket**

All you have to do is code your static application, export it and add it to your bucket

## Conclusion

As you can see it is very easy to host a static **Next.js** app on aws, in the next article i think we will see how to work with github actions to use continuous integration on our **Next.js** app, so every merge on branch main your application will be updated on your bucket.

Thank you for following this article, do not hesitate to give me your feedback and if you liked it share it and follow me on [Twitter](https://twitter.com/theCrispydesign)
