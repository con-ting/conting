package com.c209.batchservice.global.process;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class ProcessService {
    private String executeCommand(String... command) throws IOException, InterruptedException {
        Process process = new ProcessBuilder(command)
                .redirectErrorStream(true)
                .start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String output = String.join("\n", reader.lines().toList());

        int exitValue = process.waitFor();
        if (exitValue != 0) {
            throw new RuntimeException(
                    "Command \"" + String.join(" ", command) + "\" failed with exit code 0x" + Integer.toHexString(exitValue) + ":\n" +
                    output
            );
        }
        return output;
    }

    public void downloadWebmVideoOnly(String videoUrl, String outputPath) throws IOException, InterruptedException {
        executeCommand(
                "yt-dlp",
                videoUrl,
                "--format", "bestvideo[ext=webm]",
                "--output", outputPath
        );
    }

    public int getVideoDuration(String videoPath) throws IOException, InterruptedException {
        return Double.valueOf(executeCommand(
                "ffprobe",
                "-i", videoPath,
                "-show_entries", "format=duration",
                "-v", "quiet",
                "-of", "csv=\"p=0\""
        )).intValue();
    }

    public void splitToWebmThumb(String inputPath, String outputDir, int splits, int duration, int time) throws IOException, InterruptedException {
        int interval = duration / splits;
        for (int i = 1; i <= splits; i++) {
            String outputVideoPath = outputDir + "/" + i + ".webm";
            String thumbPath = outputDir + "/" + i + ".jpg";
            if (Files.exists(Path.of(thumbPath))) {
                continue;
            }
            splitToWebm(
                    String.valueOf(interval * i),
                    inputPath,
                    String.valueOf(time),
                    outputVideoPath
            );
            executeCommand(
                    "ffmpeg",
                    "-y",
                    "-i", outputVideoPath,
                    "-vframes", "1",
                    thumbPath
            );
        }
    }

    private void splitToWebm(String ss, String i, String t, String output) throws IOException, InterruptedException {
        executeCommand(
                "ffmpeg",
                "-y",
                "-ss", ss,
                "-i", i,
                "-t", t,
                "-c:v", "libvpx-vp9",
                "-crf", "35",
                "-b:v", "0",
                "-an",
                output
        );
    }

    private void splitToWebp(String ss, String i, String t, String output) throws IOException, InterruptedException {
        executeCommand(
                "ffmpeg",
                "-y",
                "-ss", ss,
                "-i", i,
                "-t", t,
                "-c:v", "libwebp",
                "-lossless", "0",
                "-compression_level", "6",
                "-q:v", "60",
                "-loop", "0",
                "-preset", "default",
                "-an",
                "-vsync", "0",
                output
        );
    }
}
