A Pen created at CodePen.io. You can find this one at https://codepen.io/tsuhre/pen/GBpRzL.

 Another trick for doing simple distortions in realtime on the 2d Canvas. Relies on drawing slices of the image between two sets of lerped points on the quad.  The graphical artifacts (Moire patterns from anti-aliasing)  are mitigated by drawing subpixel lines of the image along the quad.

Spacebar to toggle animation. Mouse click+drag to move points manually