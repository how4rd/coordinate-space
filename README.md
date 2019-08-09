# coordinate-space

Using linear algebra to visualize a 3D coordinate space. You can translate and rotate the camera to change your view of the space.

## What sources did you use?

The program doesn't use any external libraries. It uses standard canvas functions to clear the screen and draw lines. I wrote all the code to figure out where to place those lines, starting with implementing matrices and matrix multiplication and building up from there.

I referenced [this lesson from scratchapixel.com](https://www.scratchapixel.com/lessons/3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points?url=3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points) to get a big-picture sense of how to proceed. I also referenced the [Translation (geometry)](https://en.wikipedia.org/w/index.php?diff=885298484#Matrix_representation) and [Rotation matrix](https://en.wikipedia.org/w/index.php?diff=908894611#Basic_rotations) articles on Wikipedia for insights into the math. I always played around with the math before implementing it in code.

## Why did you use JavaScript for this project?

My goal was to make the underlying math shine through the code clearly, rather than make the code super efficient or quick. That meant I didn't really care about the performance boost from using a compiled language. From there, I chose JavaScript since it would let me easily demo my work online.
