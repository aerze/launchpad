import {
  VERTEX_SHADER,
  FRAGMENT_SHADER,
  ZERO,
  TEXTURE_2D,
  TEXTURE_WRAP_S,
  TEXTURE_WRAP_T,
  TEXTURE_MAG_FILTER,
  TEXTURE_MIN_FILTER,
  CLAMP_TO_EDGE,
  NEAREST,
  RGBA,
  UNSIGNED_BYTE
} from "./Constants";

interface TinyTexture extends WebGLTexture {
  width?: number;
  height?: number;
}

class TinyCanvas {
  /** Compiles shader from source */
  static CompileShader(
    gl: WebGLRenderingContext,
    source: string,
    type: number
  ) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  /** Creates a program using 2 shaders */
  static CreateShaderProgram(
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string
  ) {
    const program = gl.createProgram();
    const vShader = TinyCanvas.CompileShader(gl, vsSource, VERTEX_SHADER);
    const fShader = TinyCanvas.CompileShader(gl, fsSource, FRAGMENT_SHADER);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    return program;
  }

  /** Creates WebGLBuffer */
  static CreateBuffer(
    gl: WebGLRenderingContext,
    bufferType: number,
    size: number,
    usage: number
  ) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, size, usage);
    return buffer;
  }

  /** Creates a texture render-able by TinyCanvas.img() */
  static CreateTexture(
    gl: WebGLRenderingContext,
    image:
      | ImageBitmap
      | ImageData
      | HTMLVideoElement
      | HTMLImageElement
      | HTMLCanvasElement,
    width: number,
    height: number
  ) {
    const texture: TinyTexture = gl.createTexture();
    gl.bindTexture(TEXTURE_2D, texture);
    gl.texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    gl.texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    gl.texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    gl.texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    gl.texImage2D(TEXTURE_2D, ZERO, RGBA, RGBA, UNSIGNED_BYTE, image);
    gl.bindTexture(TEXTURE_2D, null);
    texture.width = width;
    texture.height = height;
    return texture;
  }
}
