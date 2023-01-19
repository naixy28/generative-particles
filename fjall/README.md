# Self built fjall

## References

[Fjäll - A deep dive into the code and features](https://mirror.xyz/tengil.eth/QD_AxmNl4zyCm2-MG2FUlJemjY_jw5HOkntQC92Scks)

### Key steps

- FBM (fractal brownian motion) for shaping
- calculate elevation and normal in vertex shader
- calculate light strength in frag shader
- store elevation and lightStrengh in two color channels and generate raw image
- use sampling algorithm and color interpolation to generate final visual

## Screenshots

![raw image](https://user-images.githubusercontent.com/6185690/213358884-670646e0-3bef-4b03-8381-d0e14ad20d4f.png)
![final visual](https://user-images.githubusercontent.com/6185690/213358902-77245acd-59d1-4dd2-b6b6-cf555bbe885c.jpeg)
