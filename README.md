# coordinate-space

[Demo](https://how4rd.github.io/coordinate-space)

Using linear algebra to visualize a 3D coordinate space. You can translate and rotate the camera to change your view of the space.

## Goals

I knew that linear algebra is useful for graphics, but I'd never thought through all the steps to make that happen. I thought this project would be a fun way to explore an application of linear algebra.

I tried to make the mathematical concepts shine through the code and comments, even when that meant making the code less efficient. Since efficiency wasn't my main focus, I didn't care as much about the performance boost from using a compiled language. I chose JavaScript so the program would easily run in the browser. Using JS also meant I work with the HTML canvas element.

## Big picture

Each shape, such as a line segment or polygon, consists of a bunch of coordinates expressed relative to some "local coordinate system." Every local coordinate system is defined by how its origin has been moved and its axes have been rotated relative to an absolute "world coordinate system."

Since all local coordinate systems are defined relative to the same world coordinate system, we can easily convert between local coordinate systems. To re-express the same point in space in a different local coordinate system, we multiply the point's coordinate by some matrices that rotate and translate it. Since a shape is just a bunch of coordinates connected by lines, we can re-express a shape in a different local system by re-expressing all of its coordinates.

The camera is represented as a coordinate system too. The sensor sits at the origin of its coordinate system and looks along the -z direction at an "image plane."

When we take a picture of an object, the program re-expresses that object in the camera's coordinate system. It figures out what "slice" of the object lies in front of the camera's image plane. If you drew a line segment from each point in that "slice" to the sensor, the line segment would intersect the image plane somewhere. The program figures out where on the image plane that intersection is. If you connect those intersection points with the correct lines, you get a picture of the object on the image plane. Now we convert the points on that image plane into points on the canvas and connect them with lines to make an image.

## Sources

The program doesn't use any external libraries. It uses standard canvas functions to clear the screen and draw lines. I started by implementing matrices and matrix multiplication and built it up from there.

I referenced [this lesson from scratchapixel.com](https://www.scratchapixel.com/lessons/3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points?url=3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points) to get the big picture sense of how to proceed. I also referenced the [Translation (geometry)](https://en.wikipedia.org/w/index.php?diff=885298484#Matrix_representation) and [Rotation matrix](https://en.wikipedia.org/w/index.php?diff=908894611#Basic_rotations) articles on Wikipedia for insights into the math.
