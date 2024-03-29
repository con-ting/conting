package com.c209.batchservice.batch.nft.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class ProcessService {
    private boolean executeCommand(String... command) throws IOException, InterruptedException {
        var process = new ProcessBuilder(command).start();
        var reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        while ((reader.readLine()) != null) {
        }
        return 0 == process.waitFor();
    }

    public boolean downloadWebmVideoOnly(String videoUrl, String outputPath) throws IOException, InterruptedException {
        return executeCommand(
                "yt-dlp",
                videoUrl,
                "--format", "bestvideo[ext=webm]",
                "--output", outputPath
        );
    }

    public boolean splitWebm(String inputPath, String outputDir, int duration, int splits) throws IOException, InterruptedException {
        boolean success = true;
        for (int i = 0; i < splits; i++) {
            String outputVideoPath = outputDir + "/" + i + ".webm";
            success = executeCommand(
                    "ffmpeg",
                    "-y",
                    "-i", inputPath,
                    "-ss", String.valueOf(i * duration),
                    "-t", String.valueOf(duration),
                    "-c", "copy",
                    "-an",
                    outputVideoPath
            );
            if (!success) {
                break;
            }
            String thumbnailPath = outputDir + "/" + i + ".jpg";
            success = executeCommand(
                    "ffmpeg",
                    "-y",
                    "-i", outputVideoPath,
                    "-vframes", "1",
                    thumbnailPath
            );
            if (!success) {
                break;
            }
        }
        return success;
    }
}
